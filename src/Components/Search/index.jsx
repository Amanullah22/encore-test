import React from "react";
import { AutoComplete } from 'antd';

const SearchBar = ({ search, setSearch, suggestions, selectedId }) => {
    const getSelectedOptionName = (optionId) => {
        let filteredOptionName = suggestions.filter((item) => {
            return item.value === optionId
        })

        selectedId(optionId)
        setSearch(filteredOptionName[0].label)
    }

    return <AutoComplete
        value={search}
        options={suggestions}
        style={{
            width: 500,
        }}
        onSelect={getSelectedOptionName}
        onSearch={setSearch}
        placeholder="Start typing"
    />
}

export default SearchBar