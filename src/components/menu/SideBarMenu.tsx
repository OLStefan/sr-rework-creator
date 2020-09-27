import { AnimatePresence, motion } from 'framer-motion';
import { TFunction } from 'i18next';
import React, { useEffect, useMemo, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { ESCAPE_KEY, FILE_ENDING } from '../../constants';
import { useLabels } from '../../hooks';
import {
	useCharacterLoaded,
	useCharacterName,
	useDarkMode,
	useHasFuture,
	useHasPast,
	useIsDirty,
	useIsMenuDisplayed,
} from '../../redux/selectors';
import {
	createNewCharacterThunk,
	exportCharacterFile,
	saveCharacterThunk,
	importCharacterThunk,
} from '../../redux/storage/storageThunks';
import { changeDarkMode, hideMenu, selectCharacter } from '../../redux/ui/uiActions';
import Button from '../atoms/Button';
import Switch from '../atoms/Switch';
import FileSelectButton from '../molecules/FileSelectButton';

const computedStyle = getComputedStyle(document.documentElement);

interface MenuContentProps {
	className?: string;
	display: boolean;
}
function MenuContent({ display, ...otherProps }: MenuContentProps) {
	const darkMode = useDarkMode();
	const characterLoaded = useCharacterLoaded();
	const characterName = useCharacterName();
	const undoActive = useHasPast();
	const redoActive = useHasFuture();
	const isDirty = useIsDirty();

	const dispatch = useDispatch();

	const callbacks = useUpdatingCallbacks({
		onUndo: () => dispatch(ActionCreators.undo()),
		onRedo: () => dispatch(ActionCreators.redo()),
		onHide: () => dispatch(hideMenu()),
		onKeyDown: (event: React.KeyboardEvent) => {
			if (event.key === ESCAPE_KEY) {
				callbacks.onHide();
			}
		},
		onBlur: (event: React.FocusEvent) => {
			if (display && !event.currentTarget.contains(event.relatedTarget as Node)) {
				callbacks.onHide();
			}
		},
		createNewCharacter: () => dispatch(createNewCharacterThunk()),
		loadCharacter: () => dispatch(selectCharacter()),
		importCharacter: (file: File) => dispatch(importCharacterThunk(file)),
		saveCharacter: () => dispatch(saveCharacterThunk()),
		exportCharacter: () => {
			dispatch(exportCharacterFile(characterName || labels.newCharacter));
		},
		toggleDarkMode: () => dispatch(changeDarkMode()),
	});

	const { labels } = useLabels((t: TFunction) => ({
		createNew: t('createNew'),
		load: t('load'),
		import: t('import'),
		save: t('save'),
		export: t('export'),
		darkMode: t('darkMode'),
		newCharacter: t('newCharacter'),
	}));

	// Set Focus on dislplay
	const ref = useRef<HTMLDivElement>(null);
	useEffect(() => {
		if (display && ref.current) {
			ref.current.focus();
		}
	}, [display]);

	return (
		<motion.div
			initial={{ x: '-100%' }}
			animate={{ x: 0 }}
			exit={{ x: '-100%' }}
			transition={{ duration: parseFloat(computedStyle.getPropertyValue('--long-animation-duration')) / 1000 }}
			ref={ref}
			tabIndex={-1}
			onKeyDown={callbacks.onKeyDown}
			onBlur={callbacks.onBlur}
			{...otherProps}>
			{useMemo(
				() => (
					<div className="button-container">
						<Button className="undo" onClick={callbacks.onUndo} disabled={!undoActive}>
							&#xe967;
						</Button>
						<Button className="redo" onClick={callbacks.onRedo} disabled={!redoActive}>
							&#xe968;
						</Button>
						<Button className="close" onClick={callbacks.onHide}>
							X
						</Button>
					</div>
				),
				[callbacks, redoActive, undoActive],
			)}

			<div className="content">
				{useMemo(
					() => (
						<>
							<Button onClick={callbacks.createNewCharacter}>
								<span className="symbol">&#xe924;</span>
								{labels.newCharacter}
							</Button>
							<Button onClick={callbacks.loadCharacter}>
								<span className="symbol">&#xe930;</span>
								{labels.load}
							</Button>
							<FileSelectButton onFileSelect={callbacks.importCharacter} acceptedFiles={FILE_ENDING} multiple={false}>
								<span className="symbol">&#xe960;</span>
								{labels.import}
							</FileSelectButton>
							<div className="divider" />
						</>
					),
					[callbacks, labels],
				)}
				{useMemo(
					() => (
						<>
							<Button disabled={!isDirty} onClick={callbacks.saveCharacter}>
								<span className="symbol">&#xe962;</span>
								{labels.save}
							</Button>
							<Button disabled={!characterLoaded} onClick={callbacks.exportCharacter}>
								<span className="symbol">&#xe961;</span>
								{labels.export}
							</Button>
							<div className="filler" />
						</>
					),
					[callbacks, labels, characterLoaded, isDirty],
				)}
				{useMemo(
					() => (
						<>
							<div className="divider" />
							<div className="dark-mode">
								<span className="dark-mode-label">{labels.darkMode}</span>
								<Switch checked={darkMode} onClick={callbacks.toggleDarkMode} />
							</div>
						</>
					),
					[callbacks.toggleDarkMode, darkMode, labels.darkMode],
				)}
			</div>
		</motion.div>
	);
}

interface Props {}
function SideBarMenu({ ...otherProps }: Props) {
	const displayMenu = useIsMenuDisplayed();

	return (
		<div {...otherProps} data-component="side-bar">
			<div className={`background ${displayMenu ? 'active' : ''}`} />
			<AnimatePresence>
				{useMemo(() => displayMenu && <MenuContent display={displayMenu} className="menu" />, [displayMenu])}
			</AnimatePresence>
		</div>
	);
}

export default styled(SideBarMenu)`
	width: 100%;
	height: 100%;
	z-index: 1000000;
	pointer-events: none;
	position: relative;

	.menu {
		font-size: var(--menu-font-size);
		height: 100%;
		width: 25%;
		min-width: var(--menu-min-width);
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		outline: none;
		pointer-events: auto;

		.filler {
			flex: 1 0 0;
		}

		.button-container {
			flex: 0 0 auto;
			display: flex;
			justify-content: flex-end;

			.undo,
			.redo {
				font-family: 'icomoon';
				flex: 1 0 auto;
			}

			.close {
				flex: 0 0 auto;
				padding: 0 var(--spacing-medium);
			}
		}

		.content {
			flex: 1 0 auto;
			display: flex;
			flex-direction: column;
			align-items: center;

			${Button} {
				border-radius: 0;
				text-align: left;
				padding: var(--spacing-medium);
				width: 100%;
			}

			.symbol {
				font-family: 'icomoon';
				padding-right: var(--spacing-medium);
			}

			.divider {
				width: 75%;
				border-radius: var(--border-radius);
				background-color: var(--text-on-primary);
				margin: var(--menu-divider-height) 0;
				flex: 0 0 var(--menu-divider-height);
			}

			.dark-mode {
				padding: var(--spacing-medium);
				width: 100%;
				display: flex;
				align-items: center;
				color: var(--text-on-primary);

				.dark-mode-label {
					flex: 1 0 auto;
					text-align: left;
				}

				${Switch} {
					flex: 0 0 4ch;
				}
			}
		}
	}

	.background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transition: background-color var(--long-animation-duration);
		z-index: -1;

		&.active {
			background-color: black;
			opacity: 30%;
			pointer-events: auto;
		}
	}
`;
