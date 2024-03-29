import { motion } from 'framer-motion';
import { TFunction } from 'i18next';
import { memo, useMemo } from 'react';
import { ActionCreators } from 'redux-undo';
import styled from 'styled-components';
import { useUpdatingCallbacks } from 'use-updating-callbacks';
import { CHARCTER_FILE_TYPE, ESCAPE_KEY } from '../../constants';
import { useLabels } from '../../hooks';
import {
	useAllowLocalStorage,
	useCharacterLoaded,
	useCharacterName,
	useDarkMode,
	useHasFuture,
	useHasPast,
	useIsDirty,
	useIsMenuDisplayed,
} from '../../redux/selectors';
import { clearLocalStorageThunk } from '../../redux/storage/localStorage';
import storageActions from '../../redux/storage/storageActions';
import uiActions from '../../redux/ui/uiActions';
import { BaseProps } from '../../types';
import { useDispatch } from '../../utils/store';
import Button from '../atoms/Button';
import Switch from '../atoms/ToggleSwitch';
import FileSelectButton from '../molecules/FileSelectButton';

const computedStyle = getComputedStyle(document.documentElement);

function SideBarMenu({ ...otherProps }: BaseProps) {
	const dispatch = useDispatch();

	const displayMenu = useIsMenuDisplayed();
	const darkMode = useDarkMode();
	const characterLoaded = useCharacterLoaded();
	const characterName = useCharacterName();
	const undoActive = useHasPast();
	const redoActive = useHasFuture();
	const isDirty = useIsDirty();
	const allowLocalStorage = useAllowLocalStorage();

	const { labels } = useLabels((t: TFunction) => ({
		newCharacter: t('newCharacter'),
		load: t('load'),
		import: t('import'),
		save: t('save'),
		export: t('export'),
		darkMode: t('darkMode'),
		clearLocalStorage: t('clearLocalStorage'),
		clearLocalStorageExtended: t('clearLocalStorageExtended'),
	}));

	const callbacks = useUpdatingCallbacks({
		onUndo() {
			dispatch(ActionCreators.undo());
		},
		onRedo() {
			dispatch(ActionCreators.redo());
		},
		onHide() {
			dispatch(uiActions.hideMenu());
		},
		onKeyDown(event: React.KeyboardEvent) {
			if (event.key === ESCAPE_KEY) {
				dispatch(uiActions.hideMenu());
			}
		},
		onBackgroundClick() {
			dispatch(uiActions.hideMenu());
		},
		createNewCharacter() {
			dispatch(storageActions.createNewCharacter());
		},
		loadCharacter() {
			dispatch(uiActions.startSelectingCharacter());
		},
		importCharacter(file: File) {
			dispatch(storageActions.importCharacter(file));
		},
		saveCharacter() {
			dispatch(storageActions.saveCurrentCharacter());
		},
		exportCharacter() {
			dispatch(storageActions.exportCharacterFile(characterName || labels.newCharacter));
		},
		clearLocalStorage() {
			dispatch(clearLocalStorageThunk());
		},
		toggleDarkMode() {
			dispatch(uiActions.changeDarkMode());
		},
	});

	return (
		<div {...otherProps} data-component="side-bar">
			<div className={`background ${displayMenu ? 'active' : ''}`} onClick={callbacks.onBackgroundClick} />
			<motion.div
				initial={{ x: '-100%' }}
				animate={{ x: displayMenu ? 0 : '-100%' }}
				//Convert from ms to s
				transition={{ duration: parseFloat(computedStyle.getPropertyValue('--long-animation-duration')) / 1000 }}
				tabIndex={-1}
				onKeyDown={callbacks.onKeyDown}
				className="menu">
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
								<FileSelectButton
									onFileSelect={callbacks.importCharacter}
									acceptedFiles={CHARCTER_FILE_TYPE}
									multiple={false}>
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
								{allowLocalStorage && (
									<Button title={labels.clearLocalStorageExtended} onClick={callbacks.clearLocalStorage}>
										{labels.clearLocalStorage}
									</Button>
								)}
								<div className="dark-mode">
									<span className="dark-mode-label">{labels.darkMode}</span>
									<Switch checked={darkMode} onClick={callbacks.toggleDarkMode} />
								</div>
							</>
						),
						[callbacks, darkMode, labels, allowLocalStorage],
					)}
				</div>
			</motion.div>
		</div>
	);
}

export default styled(memo(SideBarMenu))`
	width: 100%;
	height: 100%;
	z-index: 1;
	pointer-events: none;
	position: relative;

	.menu {
		font-size: var(--menu-font-size);
		height: 100%;
		width: var(--menu-min-width);
		background-color: var(--primary-color);
		display: flex;
		flex-direction: column;
		outline: none;
		pointer-events: auto;
		overflow-y: auto;

		.filler {
			flex: 1 0 0;
		}

		.button-container {
			flex: 0 0 auto;
			display: flex;
			justify-content: flex-end;

			button {
				border-radius: unset;
			}

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
