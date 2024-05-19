import { BarChart } from '@mui/x-charts';
import { Skeleton } from '@mui/material';

// Population density chart component (Not keyboard accessible!)
function PopDensityChart({ data, ...props }) {
    return (
        <>
            {data ? (
                <BarChart
                    aria-label="Population Density Chart"
                    aria-describedby="Population density chart for 5km, 10km, 30km, and 100km"
                    dataset={[
                        { distance: '5km', population: data.population_5km },
                        { distance: '10km', population: data.population_10km },
                        { distance: '30km', population: data.population_30km },
                        { distance: '100km', population: data.population_100km }
                    ]}
                    yAxis={
                        [{
                            scaleType: 'band',
                            dataKey: 'distance'
                        }]}
                    slotProps={{
                        bar: {
                            clipPath: `inset(0px round 0px 10px 10px 0px)`,
                        },
                    }}
                    series={[{ type: 'bar', dataKey: 'population', label: 'Population Within Distance \n (Click on a row to display its radius)', color: '#3f51b5' }]}
                    layout="horizontal"
                    grid={{ vertical: true }}
                    height={200}
                    {...props}
                />
            ) : (
                <Skeleton variant="rectangular" height={200} animation="wave" />
            )}
        </>
    );
};

export default PopDensityChart;

