import './styles.css';

export const TextInput = ({ searchValue, handleInputChange }) => {
    return (
        <input
            type="search"
            className='text-input'
            onChange={handleInputChange}
            value={searchValue}
            placeholder="Type your search"
        />
    )
}