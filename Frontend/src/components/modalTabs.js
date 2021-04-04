import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Paper, Tab, Tabs } from '@material-ui/core';
import { useContext, useState } from 'react';
import './modalTabs.css';
import { GlobalContext } from '../App';
import parse from 'html-react-parser';

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

    const { selectedGame } = useContext(GlobalContext);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const pcCheck = () => {
        let check = false;
        selectedGame.platforms.forEach((value) => {
            if (value === "PC") {
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
                        {selectedGame.images.map(image => {
                            return (
                                <Carousel.Item key={image} interval={5000}>
                                    <img
                                        className="game-images"
                                        src={image}
                                        alt=""
                                    />
                                </Carousel.Item>
                            );
                        })}
                    </Carousel>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <video className="clip" src={selectedGame.clip} width="1600" height="700" controls="controls" />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="dlcContainer">
                        {
                            selectedGame.dlcs.map(value => {
                                return (
                                    <div key={value.name} className="eachDlc">
                                        <div>
                                            <img src={value.poster} alt="" width="400px" />
                                        </div>
                                        <div className="dlcDescription">
                                            <h3>{value.name}</h3>
                                            {parse(value.description)}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <div className="requirements">
                        <p>{selectedGame.pcMinimum}</p>
                        <p>{selectedGame.pcRecomended}</p>
                    </div>
                </TabPanel>
            </div>
        </div>

    )
}

