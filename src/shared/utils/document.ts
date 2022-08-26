export const getScrollbar = (): number =>
  window.innerWidth - document.body.clientWidth;

export const documentDisabledScroll = () => {
  const scrollbar = getScrollbar();

  const htmlElem = document.querySelector("html");
  if (htmlElem !== null) {
    htmlElem.style.overflowY = "hidden";
    htmlElem.style.paddingRight = `${scrollbar}px`;
  }
};

export const documentEnabledScroll = () => {
  const htmlElem = document.querySelector("html");
  if (htmlElem !== null) {
    htmlElem.style.overflowY = "scroll";
    htmlElem.style.paddingRight = "0";
  }
};

export const documentScrollToTop = () => {
  document.body.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export const refreshLocation = () => {
  window.location.assign(window.location.origin);
};
