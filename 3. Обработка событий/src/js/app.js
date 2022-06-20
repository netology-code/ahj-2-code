// TODO: write your code here
import { ContactList } from "../components/contact-list/contact-list";
import { FilterWidget } from "../components/filter-widget/filter-widget";

const contactList = new ContactList('.contact-list');
const filterWidget = new FilterWidget('.filter-widget', contactList.filter);


contactList.renderUsers();