/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {closeSdk, initSdk} from '@screeb/react-native';
import React from 'react';
import {Button, SafeAreaView, Text} from 'react-native';
import InAppBrowser from 'react-native-inappbrowser-reborn';
import {SCREEB_IOS_CHANNEL_ID} from './credentials';

const initScreeb = () => {
  // @ts-ignore
  return initSdk('', SCREEB_IOS_CHANNEL_ID, 'my-user-test');
};

const closeScreeb = () => {
  return closeSdk();
};

const variablesDefined = () => {
  return !!SCREEB_IOS_CHANNEL_ID;
};

const openInAppBrowser = () => {
  InAppBrowser.open('https://www.google.com', {
    // iOS Properties
    dismissButtonStyle: 'close',
    readerMode: false,
    animated: true,
    modalPresentationStyle: 'fullScreen',
    modalTransitionStyle: 'coverVertical',
    modalEnabled: true,
    enableBarCollapsing: true,
  });
};

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      {variablesDefined() ? (
        <>
          <Button title="init SDK" onPress={initScreeb} />
          <Button title="close SDK" onPress={closeScreeb} />
          <Button
            title="trigger SDK issue"
            onPress={async () => {
              await initScreeb();
              await closeScreeb();
              await initScreeb();
            }}
          />
          <Button title="trigger in app browser" onPress={openInAppBrowser} />
        </>
      ) : (
        <Text>
          SCREEB_IOS_CHANNEL_ID is not defined. Please copy the
          credentials.local.ts into credentials.ts at the root of the project.
        </Text>
      )}
    </SafeAreaView>
  );
}

export default App;
