import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";

import "dayjs/locale/ru";

// locale
dayjs.locale("ru");

// plugins
dayjs.extend(customParseFormat);
dayjs.extend(utc);

export { dayjs };
