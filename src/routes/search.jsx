import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Button, FormControl, FormLabel, FormControlLabel, Radio, RadioGroup, Divider, TextField } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { toast } from 'react-toastify';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
// Components import
import MultiSearch from '../components/multiSearch';
// Common import
import API from '../common/api';

// Search route
function Search() {
    // Navigate function
    const navigate = useNavigate();

    // Create state variables
    const [countryList, setCountryList] = useState([]); // Countries list
    const [volcanoes, setVolcanoes] = useState([]); // Current Volcanoes list
    const [countries, setCountries] = useState([]); // Current countries list
    const [selectedCountries, setSelectedCountries] = useState([]); // Selected countries
    const [selectedDistance, setSelectedDistance] = useState(''); // Selected distance
    const [quickFilter, setQuickFilter] = useState(''); // Quick filter for table

    // Update volcanoes function
    function updateVolcanoes(newCountries, previousVolcanoes = []) {
        // Create an array of promises to get the volcanoes from each country
        Promise.all(
            newCountries.map(country =>
                API.getVolcanoes(country, selectedDistance)
            )
        ).then(newVolcanoes => {
            // Combine previous volcanoes with new volcanoes
            const allVolcanoes = previousVolcanoes.concat(newVolcanoes.flat());

            // Update current volcanoes and countries
            setVolcanoes(allVolcanoes);
            setCountries(newCountries);
        }).catch(error => {
            // Log the error, user message handled in API.js
            console.error(error);
        });
    }

    // Fetch volcanoes on selectedCountries change
    useEffect(() => {
        // If any countries are selected
        if (selectedCountries.length !== 0) {
            // Get previous volcanoes that are in the selected countries
            const previousVolcanoes = volcanoes.filter(volcano => selectedCountries.includes(volcano.country));
            // Get new countries that were not in the previous Countries
            const newCountries = selectedCountries.filter(country => !countries.includes(country));

            // Updates volcanoes with only the new countries keeping previous volcanoes for optimisation
            updateVolcanoes(newCountries, previousVolcanoes);
        } else {
            // No countries selected, reset volcanoes
            setVolcanoes([]);
        }
    }, [selectedCountries]);

    // Fetch volcanoes on selectedDistance change
    useEffect(() => {
        // If any countries are selected
        if (selectedCountries.length !== 0) {
            // Update volcanoes, updating all countries, without previous volcanoes
            updateVolcanoes(selectedCountries);
        } else {
            // No countries selected, clear volcanoes
            setVolcanoes([]);
        }
    }, [selectedDistance]);

    // Fetch countries on initial render
    useEffect(() => {
        // Get countries from API (If everything fails, alert user)
        API.getCountries()
            .then(countries => setCountryList(countries))
            .catch(() => toast.error("We couldn't retrieve the list of countries right now, Please try again later."));
    }, [countries]);

    return (
        <div className='FullHeight ColumnContainer BlurContainer'>
            <h1>Countries</h1>
            <Divider />
            {/* Search Form */}
            <div className='PaddedForm ColumnContainer'>
                <Grid container spacing={1}>
                    <Grid item xs={12} sm={8}>
                        {/* Multi Search Input */}
                        <MultiSearch
                            // Required props
                            options={countryList}
                            onSelect={value => setSelectedCountries(value)}
                            // Optional props
                            label="Search by Countries"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        {/* Quick Filter Input */}
                        <TextField
                            onChange={(event) => setQuickFilter(event.target.value)}
                            label="Quick Filter"
                            variant="filled"
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item>
                        {/* Distance Radio Group */}
                        <FormControl style={{ float: 'left', textAlign: 'left' }}>
                            <FormLabel id="distance-radio-group">Distance</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="distance-radio-group"
                                name="distance-radio-group"
                                value={selectedDistance}
                                onChange={(event) => setSelectedDistance(event.target.value)}
                            >
                                <FormControlLabel value="" control={<Radio />} label="All" />
                                <FormControlLabel value="5km" control={<Radio />} label="5km" />
                                <FormControlLabel value="10km" control={<Radio />} label="10km" />
                                <FormControlLabel value="30km" control={<Radio />} label="30km" />
                                <FormControlLabel value="100km" control={<Radio />} label="100km" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        {/* Submit Button */}
                        <Button
                            variant="contained"
                            color="primary"
                            // Force the update of the volcanoes without getting the previous volcanoes
                            onClick={() => updateVolcanoes(selectedCountries)}
                        >
                            Search
                        </Button>
                    </Grid>
                </Grid>
            </div>
            <Divider />
            {/* Results Table */}
            <div className="ag-theme-quartz-dark ag-theme-charlie">
                <AgGridReact
                    rowData={volcanoes}
                    columnDefs={[
                        { headerName: "Name", field: "name" },
                        { headerName: "Country", field: "country" },
                        { headerName: "Region", field: "region" },
                        { headerName: "Sub-Region", field: "subregion" }
                    ]}
                    onRowClicked={(event) => navigate(`/volcano/${event.data.id}`)}
                    onCellKeyDown={(event) => {
                        if (event.event.key === "Enter") {
                            navigate(`/volcano/${event.data.id}`);
                        }
                    }}
                    pagination={true}
                    paginationAutoPageSize={true}
                    quickFilterText={quickFilter}
                    aria-label="Volcano Search Results"
                    aria-describedby="Table showing the search results of volcanoes"
                />
            </div>
        </div>
    );
}

export default Search;
