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

export const iconsArrOfObjects = [
    { title: "add another", tag: <AutoAwesomeIcon color="success"/>},
    { title: "salary", tag: <AddCardIcon className="iconsStyle" color="success"/> },
    { title: "clothes", tag: <CheckroomIcon className="iconsStyle" color="success"/> },
    { title: "dining", tag: <DiningIcon className="iconsStyle" color="success"/> },
    { title: "bonuses", tag: <CardGiftcardIcon color="success"/>},
    { title: "gasStation", tag: <LocalGasStationIcon color="success"/>},
    { title: "coctails", tag: <LocalBarIcon color="success"/>},
    { title: "devices", tag: <DevicesOtherIcon color="success"/>},
    { title: "freelance projects",tag:<AddTaskIcon color="success"/> },
    { title: "investments", tag: <MonetizationOnIcon color="success"/> },
    { title: "others", tag: <AddCircleOutlineIcon color="success"/>},
    { title: "rent",tag: <AddHomeWorkIcon color="success"/>},
    { title: "store",tag: <StoreIcon color="success"/>},
    { title: "mortgage", tag: <HomeIcon color="success"/>},
    { title: "household bills",tag: <AddCardIcon color="success"/>},
    { title: "food", tag: <FastfoodIcon color="success"/>},
    { title: "health care", tag: <LocalHospitalIcon color="success"/>},
    { title: "entertainment", tag: <CelebrationIcon color="success"/>},
    { title: "sport",tag: <FitnessCenterIcon color="success"/>},
    { title: "trips", tag: <LocalAirportIcon color="success"/>},
    { title: "gifts", tag: <CardGiftcardIcon color="success"/>},
    { title: "shopping", tag: <ShoppingCartIcon color="success"/>},
    { title: "house renovation",tag: <RoomPreferencesIcon color="success"/>},
    { title: "house insuranse",tag: <AddHomeIcon color="success"/>},
    { title: "car supplies and renovation",tag: <CarRepairIcon color="success"/>},
    { title: "car insurance", tag: <NoCrashIcon color="success"/>},
    { title: 'events', tag: <EventAvailableIcon color="success"/>},
    { title: 'education', tag: <SchoolIcon color="success"/>},
    { title: 'familly', tag: <FamilyRestroomIcon color="success"/>},
    { title: 'kids', tag: <BabyChangingStationIcon color="success"/>},
]

export function getTheIcon(titleOfIcon){
    iconsArrOfObjects.map(icon => {
        if(icon.title === titleOfIcon){
            return icon.tag;
        }
    })
}