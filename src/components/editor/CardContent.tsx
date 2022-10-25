import { memo, useMemo } from 'react';
import { BaseProps, SectionType } from '../../types';
import AttributeSection from './attributes/AttributeSection';
import DetailsSection from './details/DetailsSection';

interface Props extends BaseProps {
	name: SectionType;
}

function CardContent({ name, ...otherProps }: Props) {
	return useMemo(() => {
		switch (name) {
			case SectionType.ATTRIBUTES:
				return <AttributeSection {...otherProps} />;
			case SectionType.DETAILS:
				return <DetailsSection {...otherProps} />;
			default:
				return <span>Some text</span>;
		}
	}, [name, otherProps]);
}

export default memo(CardContent);
