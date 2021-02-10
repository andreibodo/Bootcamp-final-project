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

    const { selectedGameImages, selectedGame,gameClip,requirements } = useContext(GlobalContext);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const pcCheck = () => {
        let check = false;
        selectedGame.parent_platforms.forEach((value) => {
            if (value.platform.name === "PC") {
                check = true;
            };
        });
        if (check) {
            return (
                <Tab label="PC Requirements" />
            );
        }
    };

    return (
        <div>
            <div className="modal-nav">
                <Tabs
                    value={value}
                    indicatorColor="secondary"
                    onChange={handleChange}
                    centered
                >
                    <Tab label="Images" />
                    <Tab label="Clips" />
                    <Tab label="DLC" />
                    {pcCheck()}
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
                <TabPanel value={value} index={1}>
                    <video src={gameClip} width="1600" height="700" controls="controls" />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h1>ON HOLD</h1>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div className="requirements">
                        <p>{requirements.minimum}</p>
                        <p>{requirements.recommended}</p>
                    </div>
                </TabPanel>
            </div>
        </div>

    )
}

