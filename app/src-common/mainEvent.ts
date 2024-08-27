import { Page, PageItem } from '@virtu-button/common/Plugin';
import { Settings } from './settings';

// Main -> Renderer

export type MainEventHandle = {
  params: any[];
};

export type MainEventParams = {
  'update:settings': {
    params: [Settings];
  };
  'update:pages': {
    params: [Page[]];
  };
  // 'update:pageItemViewProps': {
  //   params: Parameters<typeof editPageItemViewProps>;
  // };
  'update:pageItem': {
    params: [PageItem];
  };
};
