import React, { useMemo } from 'react';
import { SectionName } from '../../types';
import AttributeSection from './attributes/AttributeSection';
import DetailsSection from './details/DetailsSection';

interface Props extends BaseProps {
	name: SectionName;
}

function CardContent({ name, ...otherProps }: Props) {
	return useMemo(() => {
		switch (name) {
			case SectionName.ATTRIBUTES:
				return <AttributeSection {...otherProps} />;
			case SectionName.DETAILS:
				return <DetailsSection {...otherProps} />;
			default:
				return <span>Some text</span>;
		}
	}, [name, otherProps]);
}

export default React.memo(CardContent);
