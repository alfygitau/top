import { combineReducers } from "redux";
import { ordersReducers } from "./ordersReducer";
import { languagesReducers } from "./languagesReducer";
import { levelsReducers } from "./levelsReducer";
import { pagesReducers } from "./pagesReducer";
import { servicesReducers } from "./servicesReducer";
import { sourcesReducers } from "./sourcesReducer";
import { spacingReducers } from "./spacingReducer";
import { stylesReducers } from "./stylesReducer";
import { subjectsReducers } from "./subjectReducer";
import { typesReducers } from "./typesReducer";
import { urgenciesReducers } from "./urgencyReducer";
import { walletReducer } from "./walletReducer";
import { ratingsReducers } from "./ratingsReducer";
import { messagesReducers } from "./messagesReducer";
import { blogReducers } from "./blogReducer";

const rootReducer = combineReducers({
  orderState: ordersReducers,
  languageState: languagesReducers,
  levelState: levelsReducers,
  pageState: pagesReducers,
  serviceState: servicesReducers,
  sourceState: sourcesReducers,
  spacingState: spacingReducers,
  styleState: stylesReducers,
  subjectState: subjectsReducers,
  typeState: typesReducers,
  urgencyState: urgenciesReducers,
  messageState: messagesReducers,
  ratingState: ratingsReducers,
  walletState: walletReducer,
  blogState: blogReducers,
});

export default rootReducer;
