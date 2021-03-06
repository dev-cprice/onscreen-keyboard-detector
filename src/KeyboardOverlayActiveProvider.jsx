import React from "react";
import PropTypes from "prop-types";
import KeyboardOverlayActiveContext from "./KeyboardOverlayActiveContext";
import onMobileBrowser from "./onMobileBrowser";
import eventAffectsKeyboardOverlay from "./eventAffectsKeyboardOverlay";

const propTypes = {
  children: PropTypes.node.isRequired
};

function KeyboardOverlayActiveProvider({ children }) {
  const [
    isOnscreenKeyboardVisible,
    setIsOnscreenKeyboardVisible
  ] = React.useState(false);

  const isOnMobileBrowser = onMobileBrowser();

  const handleFocus = React.useCallback(event => {
    if (eventAffectsKeyboardOverlay(event)) {
      setIsOnscreenKeyboardVisible(true);
    }
  }, []);

  const handleBlur = React.useCallback(event => {
    if (eventAffectsKeyboardOverlay(event)) {
      setIsOnscreenKeyboardVisible(false);
    }
  }, []);

  return (
    <KeyboardOverlayActiveContext.Provider value={isOnscreenKeyboardVisible}>
      <div
        onFocusCapture={isOnMobileBrowser ? handleFocus : undefined}
        onBlurCapture={isOnMobileBrowser ? handleBlur : undefined}
      >
        {children}
      </div>
    </KeyboardOverlayActiveContext.Provider>
  );
}

KeyboardOverlayActiveProvider.propTypes = propTypes;

export default KeyboardOverlayActiveProvider;
