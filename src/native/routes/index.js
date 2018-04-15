import React from 'react';
import { Scene, Tabs, Stack } from 'react-native-router-flux';
import { Icon } from 'native-base';

import DefaultProps from '../constants/navigation';
import AppConfig from '../../constants/config';

import ScanContainer from '../../containers/ScanContainer';
import BooksContainer from '../../containers/BooksContainer';

import ScanComponent from '../components/Scan';
import BookListingComponent from '../components/BookListing';
import BookViewComponent from '../components/BookView';


const Index = (
  <Stack>
    <Scene hideNavBar>
      <Tabs
        key="tabbar"
        swipeEnabled
        type="replace"
        showLabel={false}
        {...DefaultProps.tabProps}
      >
        <Stack
          key="home"
          title={AppConfig.appName.toUpperCase()}
          icon={() => <Icon name="barcode" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="home" component={ScanContainer} Layout={ScanComponent} />
        </Stack>

        <Stack
          key="Books"
          title="SCANNED BOOKS"
          icon={() => <Icon name="book" {...DefaultProps.icons} />}
          {...DefaultProps.navbarProps}
        >
          <Scene key="Books" component={BooksContainer} Layout={BookListingComponent} />
        </Stack>
      </Tabs>
    </Scene>

    <Scene
      back
      clone
      key="Book"
      title="BOOK"
      {...DefaultProps.navbarProps}
      component={BooksContainer}
      Layout={BookViewComponent}
    />
  </Stack>
);

export default Index;
