import React from "react";
import { AutoComplete } from 'antd';
import { useSelector } from "react-redux";

const SearchBar = ({ search, setSearch, selectedId }) => {
    const suggestions = useSelector((state) => state.google.predictions)

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