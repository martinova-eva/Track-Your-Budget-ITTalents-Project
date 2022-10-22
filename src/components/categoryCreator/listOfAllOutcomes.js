import React, { useState } from "react";
import {v4 as uuidV4} from 'uuid';
import HomeIcon from '@mui/icons-material/Home';
import AddHomeWorkIcon from '@mui/icons-material/AddHomeWork';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import CelebrationIcon from '@mui/icons-material/Celebration';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LocalAirportIcon from '@mui/icons-material/LocalAirport';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import AddHomeIcon from '@mui/icons-material/AddHome';
import NoCrashIcon from '@mui/icons-material/NoCrash';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import SchoolIcon from '@mui/icons-material/School';
import FamilyRestroomIcon from '@mui/icons-material/FamilyRestroom';
import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation';
import AddCardIcon  from '@mui/icons-material/AddCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export const possibleOutcomeArr = [
    { title: "Rent", type: "outcome", id: uuidV4(), tag: <AddHomeWorkIcon color="success"/>},
    { title: "Mortgage", type: "outcome", id: uuidV4(), tag: <HomeIcon color="success"/>},
    { title: "Household bills", type: "outcome", id: uuidV4(), tag: <AddCardIcon color="success"/>},
    { title: "Food", type: "outcome", id: uuidV4(), tag: <FastfoodIcon color="success"/>},
    { title: "Health care", type: "outcome", id: uuidV4(), tag: <LocalHospitalIcon color="success"/>},
    { title: "Entertainment", type: "outcome", id: uuidV4(), tag: <CelebrationIcon color="success"/>},
    { title: "Sport", type: "outcome", id: uuidV4(), tag: <FitnessCenterIcon color="success"/>},
    { title: "Trips", type: "outcome", id: uuidV4(), tag: <LocalAirportIcon color="success"/>},
    { title: "Gifts", type: "outcome", id: uuidV4(), tag: <CardGiftcardIcon color="success"/>},
    { title: "Shopping", type: "outcome", id: uuidV4(), tag: <ShoppingCartIcon color="success"/>},
    { title: "House renovation", type: "outcome", id: uuidV4(), tag: <RoomPreferencesIcon color="success"/>},
    { title: "House insuranse", type: "outcome", id: uuidV4(), tag: <AddHomeIcon color="success"/>},
    { title: "Car supplies and renovation", type: "outcome", id: uuidV4(),tag: <CarRepairIcon color="success"/> },
    { title: "Car insurance", type: "outcome", id: uuidV4(), tag: <NoCrashIcon color="success"/>},
    { title: 'Events', type: "outcome", id: uuidV4(), tag: <EventAvailableIcon color="success"/>},
    { title: 'Education', type: "outcome", id: uuidV4(), tag: <SchoolIcon color="success"/>},
    { title: 'Familly', type: "outcome", id: uuidV4(), tag: <FamilyRestroomIcon color="success"/>},
    { title: 'Kids', type: "outcome", id: uuidV4(),  tag: <BabyChangingStationIcon color="success"/>},
    { title: "Add another", type: "outcome", id: uuidV4(), tag: <AddCircleOutlineIcon color="success"/>},
]
