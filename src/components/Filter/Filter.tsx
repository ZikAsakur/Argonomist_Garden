import React from "react";
import type { Filters } from "../../types/Visitor";
import './Filter.css';

interface FilterProps {
    filters: Filters;
    onFiltersChange:(filters: Filters) => void;
}

export const Filter: React.FC<FilterProps> =({
    filters,
    onFiltersChange,
}) => {
    const handleFilterChange = (present: string) =>{
        onFiltersChange({
            present: filters.present === present ? '' : present,
        });
    };

    const clearFilter = () =>{
        onFiltersChange({
            present: '',
        });
    };

    const hasActiveFilter = filters.present !== '';

    return (
        <div className="filter-section">

            <div className="filter-buttons">
                <strong>Фильтровать по:</strong>

                <button
                    className={`filter-btn ${filters.present === 'true' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('true')}
                >Присутствующим</button>

                <button 
                    className={`filter-btn ${filters.present === 'false' ? 'active' : ''}`}
                    onClick={() => handleFilterChange('false')}
                >Отсутствующим</button>

                {hasActiveFilter &&(
                    <button className="filter-btn clear-btn" onClick={clearFilter}>
                        Без фильтров
                    </button>
                )}
            </div>
        </div>
    )
}