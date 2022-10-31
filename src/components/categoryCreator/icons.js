import AddCardIcon  from '@mui/icons-material/AddCard';
import CardGiftcardIcon from '@mui/icons-material/CardGiftcard';
import AddTaskIcon from '@mui/icons-material/AddTask';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
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
import CheckroomIcon from '@mui/icons-material/Checkroom';
import DiningIcon from '@mui/icons-material/Dining';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import { v4 as uuidV4 } from 'uuid';

export const iconsArrOfObjects = [
    { title: "add another", tag: <AutoAwesomeIcon key={uuidV4()} color="success" /> },
    { title: "salary", tag: <AddCardIcon  key={uuidV4()} className="iconsStyle" color="success" /> },
    { title: "clothes", tag: <CheckroomIcon key={uuidV4()} className="iconsStyle" color="success" /> },
    { title: "dining", tag: <DiningIcon key={uuidV4()} className="iconsStyle" color="success" /> },
    { title: "bonuses", tag: <CardGiftcardIcon key={uuidV4()} className="iconsStyle" color="success" /> },
    { title: "gasStation", tag: <LocalGasStationIcon key={uuidV4()} color="success" /> },
    { title: "coctails", tag: <LocalBarIcon key={uuidV4()} color="success" /> },
    { title: "devices", tag: <DevicesOtherIcon key={uuidV4()} color="success" /> },
    { title: "freelance projects", tag: <AddTaskIcon  key={uuidV4()} color="success" /> },
    { title: "investments", tag: <MonetizationOnIcon key={uuidV4()} color="success" /> },
    { title: "others", tag: <AddCircleOutlineIcon key={uuidV4()} color="success" /> },
    { title: "rent", tag: <AddHomeWorkIcon key={uuidV4()} color="success" /> },
    { title: "store", tag: <StoreIcon key={uuidV4()} color="success" /> },
    { title: "mortgage", tag: <HomeIcon key={uuidV4()} color="success" /> },
    { title: "household bills", tag: <AddCardIcon key={uuidV4()} color="success" /> },
    { title: "food", tag: <FastfoodIcon key={uuidV4()} color="success" /> },
    { title: "health care", tag: <LocalHospitalIcon key={uuidV4()} color="success" /> },
    { title: "entertainment", tag: <CelebrationIcon key={uuidV4()} color="success" /> },
    { title: "sport", tag: <FitnessCenterIcon key={uuidV4()} color="success" /> },
    { title: "trips", tag: <LocalAirportIcon key={uuidV4()}  color="success" /> },
    { title: "gifts", tag: <CardGiftcardIcon key={uuidV4()} color="success" /> },
    { title: "shopping", tag: <ShoppingCartIcon key={uuidV4()} color="success" /> },
    { title: "house renovation", tag: <RoomPreferencesIcon key={uuidV4()} color="success" /> },
    { title: "house insuranse", tag: <AddHomeIcon key={uuidV4()} color="success" /> },
    { title: "car supplies and renovation", tag: <CarRepairIcon key={uuidV4()} color="success" /> },
    { title: "car insurance", tag: <NoCrashIcon key={uuidV4()} color="success" /> },
    { title: 'events', tag: <EventAvailableIcon key={uuidV4()} color="success" /> },
    { title: 'education', tag: <SchoolIcon key={uuidV4()} color="success" /> },
    { title: 'familly', tag: <FamilyRestroomIcon key={uuidV4()} color="success" /> },
    { title: 'kids', tag: <BabyChangingStationIcon key={uuidV4()} color="success" /> },
]
export default function getTheIcon(titleOfIcon){
    iconsArrOfObjects.map(icon => {
        if(icon.title.toLowerCase() === titleOfIcon.toLowerCase()){
            return icon.tag;
        } 
    })
}