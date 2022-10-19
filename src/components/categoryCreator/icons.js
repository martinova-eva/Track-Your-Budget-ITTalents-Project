import { Camera } from '@mui/icons-material'
import AddCardOutlinedIcon from '@mui/icons-material/AddCardOutlined';
import PaymentsOutlinedIcon from '@mui/icons-material/PaymentsOutlined';

export const possibleIcons = [
    { title: "salary", tag: "AddCardOutlinedIcon"},
    { title: "bonuses", tag: "PaymentsOutlinedIcon"},
    { title: "freelance projects",tag: "PaymentsOutlinedIcon"},
    { title: "investments", tag: "PaymentsOutlinedIcon"},
    { title: "others", tag: "PaymentsOutlinedIcon"},
    { title: "add another", tag: "PaymentsOutlinedIcon"},
    { title: "rent",tag: "PaymentsOutlinedIcon"},
    { title: "mortgage", tag: "PaymentsOutlinedIcon"},
    { title: "household bills",tag: "PaymentsOutlinedIcon"},
    { title: "food", tag: "PaymentsOutlinedIcon"},
    { title: "health care", tag: "PaymentsOutlinedIcon"},
    { title: "entertainment", tag: "PaymentsOutlinedIcon"},
    { title: "sport",tag: "PaymentsOutlinedIcon"},
    { title: "trips", tag: "PaymentsOutlinedIcon"},
    { title: "gifts", tag: "PaymentsOutlinedIcon"},
    { title: "shopping", tag: "PaymentsOutlinedIcon"},
    { title: "house renovation",tag: "PaymentsOutlinedIcon"},
    { title: "house insuranse",tag: "PaymentsOutlinedIcon"},
    { title: "car supplies and renovation",tag: "PaymentsOutlinedIcon"},
    { title: "car insurance", tag: "PaymentsOutlinedIcon"},
    { title: 'events', tag: "PaymentsOutlinedIcon"},
    { title: 'education', tag: "PaymentsOutlinedIcon"},
    { title: 'custom', tag: "PaymentsOutlinedIcon"},
    { title: 'others', tag: "PaymentsOutlinedIcon"},
    { title: "add another", tag: "PaymentsOutlinedIcon"},
]
const symbolls = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

export const iconsArrOfObjects = possibleIcons.map(i => {
    i.id = `${Math.floor(Math.random()*20)}${symbolls[Math.floor(Math.random()*(symbolls.length))]}`;
    return i;
});