import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Box, Button, Paper, Tab, Tabs } from '@material-ui/core';
import { useContext, useState } from 'react';
import './modalTabs.css';
import { GlobalContext } from '../App';

function TabPanel(props) {
    const { value, index, children } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`${index}`}
        >
            {value === index && (
                <div className="tab-container" p={3}>
                    {children}
                </div>
            )}
        </div>
    );
}

export default function ModalTabs() {
    const { selectedGameImages } = useContext(GlobalContext);
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div>
            <div className="modal-nav">
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    textColor="palette.secondary.dark"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Images" />
                    <Tab label="Clips" />
                    <Tab label="Games that may interest you" />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <Carousel className="carousel">
                        {selectedGameImages.map(image => {
                            return (
                                <Carousel.Item key={image.id} interval={5000}>
                                    <img
                                        className="game-images"
                                        src={image.image}
                                        alt=""
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </TabPanel>
            </div>
        </div>

    )
}

