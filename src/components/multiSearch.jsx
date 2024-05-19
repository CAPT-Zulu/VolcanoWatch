import React, { useState, useRef } from 'react';
import { TextField, Menu, MenuItem, Chip, Grow } from '@mui/material';

// My custom MultiSearch component
// I created this component after I was told that we couldn't use pre-built search components such as Material's Autocomplete
// After which my tutor confirmed that we could in fact use pre-built search components. However, we both agreed that this component was worth keeping.
// I based this component off Material's Autocomplete component with its use of Menu and Chip components.
// Frankly, I'm quite proud of this component despite the fact that it may not be as polished as Material's Autocomplete component.
function MultiSearch({ options, onSelect, ...Props }) {
    // State variables
    const [searchTerm, setSearchTerm] = useState(''); // State for the search term
    const [selectedOptions, setSelectedOptions] = useState([]); // State for the selected options
    const [open, setOpen] = useState(false); // State for the menu open/close
    const [anchorEl, setAnchorEl] = useState(null); // State for the menu anchor element
    const [focusedOptionIndex, setFocusedOptionIndex] = useState(0); // State for the focused option index

    // Reference to the TextField
    const inputRef = useRef(null);

    // Filter the options based on the search term
    const filteredOptions = options.filter((option) =>
        // Filter the options based on the search term (case insensitive)
        option.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle search term change
    const handleSearchChange = (event) => {
        setFocusedOptionIndex(0); // Reset the focused option index
        setSearchTerm(event.target.value); // Update the search term
        setOpen(true); // Ensure the menu is open
    };

    // Handle option selection
    const handleOptionSelect = (option) => {
        // If the option is not already selected
        if (!selectedOptions.includes(option)) {
            // Add the option to the selected options
            setSelectedOptions([...selectedOptions, option]);
            // Call the onSelect callback with the updated selected options
            onSelect([...selectedOptions, option]);
        }
        // Clear the search term and close the menu
        setSearchTerm('');
        setOpen(false);
    };

    // Handle chip deletion
    const handleChipDelete = (option) => {
        // Remove the option from the selected options
        setSelectedOptions(selectedOptions.filter((item) => item !== option));
        // Call the onSelect callback with the updated selected options
        onSelect(selectedOptions.filter((item) => item !== option));
    };


    // Handle click event
    const handleClick = (event) => {
        setOpen(true); // Open the menu
        // Calculate and set anchorEl for Menu positioning
        setAnchorEl(event.currentTarget);
    };

    // Handle menu close
    const handleClose = () => {
        setOpen(false); // Close the menu
    };

    // Handle key down event
    const handleKeyDown = (event) => {
        // Handle key events for accessibility and usability reasons.
        // Works similar to the Autocomplete component.
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault(); // Prevent scrolling
                // Set focused option up one, if possible
                setFocusedOptionIndex(prevIndex => Math.min(prevIndex + 1, filteredOptions.length - 1));
                break;
            case 'ArrowUp':
                event.preventDefault(); // Prevent scrolling
                // Set focused option down one, if possible
                setFocusedOptionIndex(prevIndex => Math.max(prevIndex - 1, 0));
                break;
            case 'Enter':
                event.preventDefault(); // Prevent losing focus
                // Select the focused option
                handleOptionSelect(filteredOptions[focusedOptionIndex]);
                break;
            case 'Escape':
                event.preventDefault(); // Prevent losing focus
                // Close the menu
                setOpen(false);
                break;
            default:
                break;
        }
    };

    return (
        <div>
            {/* Search TextField */}
            <TextField
                inputRef={inputRef} // Attach the ref
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={handleClick} // Open Menu on click
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                {...Props}
            />
            {/* Autocomplete Menu */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                autoFocus={false} // <- Important to prevent the TextField from losing focus
                disableAutoFocus // <- Also important to prevent the TextField from losing focus
                sx={{
                    '& .MuiPaper-root': {
                        width: anchorEl ? anchorEl.clientWidth : 'auto',
                        maxHeight: 200,
                    },
                }}
            >
                {filteredOptions.map((option) => (
                    <MenuItem
                        key={option}
                        onClick={() => handleOptionSelect(option)}
                        sx={{
                            '&': {
                                // If item is selected or focused, change the background color
                                backgroundColor: selectedOptions.includes(option) || focusedOptionIndex === filteredOptions.indexOf(option) ? 'rgba(0, 0, 0, 0.08)' : 'transparent',
                            }
                        }}
                    >
                        {option}
                    </MenuItem>
                ))}
            </Menu>
            {/* Selected Options */}
            <div style={{ textAlign: 'left' }}>
                {selectedOptions.map((option) => (
                    <Grow in={true} timeout={500} key={option}>
                        <Chip
                            key={option}
                            label={option}
                            onDelete={() => handleChipDelete(option)}
                            sx={{
                                '&': {
                                    margin: '4px',
                                }
                            }}
                        />
                    </Grow>
                ))}
            </div>
        </div>
    );
}

export default MultiSearch;