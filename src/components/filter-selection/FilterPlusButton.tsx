import React, { useState } from 'react';
import Tooltip from '../Tooltip';
import SortOrFilterSwitch from './sort-or-filter-switch/SortOrFilterSwitch';
import { useTranslation } from 'react-i18next';
import SelectFilterInterface from "./sort-or-filter-switch/filter/SelectFilterInterface.tsx";
import {Filter} from "../../types/filter/Filter.ts";

interface FilterPlusButtonProps {
    onAdded: (filter: Filter) => void;
}

const FilterPlusButton: React.FC<FilterPlusButtonProps> = ({ onAdded }) => {
    const { t } = useTranslation();
    const [showSelect, setShowSelect] = useState(false);
    const [showSort, setShowSort] = useState(false);
    const [showFilter, setShowFilter] = useState(false);

    const handleToggleSelect = () => {
        setShowSelect(prev => !prev);
    };

    const handleCloseSwitch = () => {
        setShowSelect(false);
    };

    const handleShowSort = () => {
        setShowSort(true);
    }

    const handleShowFilter = () => {
        setShowFilter(true);
    }

    const handleOnAdded = (filter: Filter): void => {
        setShowFilter(false);
        onAdded(filter);
    }

    return (
        <>
            <div className='relative'>
                <Tooltip text={t("raw_newFilter")}>
                    <button
                        className="w-6 h-6 m-0 mx-1 p-0 bg-none text-black dark:text-white rounded-full border-gray-400 transition-all flex items-center justify-center"
                        onClick={handleToggleSelect}
                    >
                        +
                    </button>
                </Tooltip>
                {showSelect && (
                    <SortOrFilterSwitch onClose={handleCloseSwitch} onClickSort={handleShowSort} onClickFilter={handleShowFilter} />
                )}
            </div>
            {showSort && null}
            {showFilter && <SelectFilterInterface onAdded={handleOnAdded} onClose={() => setShowFilter(false)} />}
        </>
    );
};

export default FilterPlusButton;