import type { Button } from '@ohif/core/types';
import { ToolbarService, ViewportGridService } from '@ohif/core';
import { EVENTS } from '@cornerstonejs/core';

const { createButton } = ToolbarService;

export const setToolActiveToolbar = {
  commandName: 'setToolActiveToolbar',
  commandOptions: {
    toolGroupIds: ['default', 'mpr', 'SRToolGroup', 'volume3d'],
  },
};

const toolbarButtons: Button[] = [
  {
    id: 'Zoom',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-zoom',
      label: 'Zoom',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'WindowLevel',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-window-level',
      label: 'Window Level',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'Pan',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-move',
      label: 'Pan',
      commands: setToolActiveToolbar,
      evaluate: 'evaluate.cornerstoneTool',
    },
  },
  {
    id: 'TrackballRotate',
    uiType: 'ohif.radioGroup',
    props: {
      type: 'tool',
      icon: 'tool-3d-rotate',
      label: '3D Rotate',
      commands: setToolActiveToolbar,
      evaluate: {
        name: 'evaluate.cornerstoneTool',
        disabledText: 'Select a 3D viewport to enable this tool',
      },
    },
  },
  {
    id: 'Capture',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-capture',
      label: 'Capture',
      commands: 'showDownloadViewportModal',
      evaluate: 'evaluate.action',
    },
  },
  {
    id: 'Layout',
    uiType: 'ohif.layoutSelector',
    props: {
      rows: 3,
      columns: 4,
      evaluate: 'evaluate.action',
      commands: 'setViewportGridLayout',
    },
  },
  {
    id: 'Crosshairs',
    uiType: 'ohif.radioGroup',
    props: {
      icon: 'tool-crosshair',
      label: 'Crosshairs',
      commands: {
        commandName: 'setToolActiveToolbar',
        commandOptions: {
          toolGroupIds: ['mpr'],
        },
      },
      evaluate: {
        name: 'evaluate.cornerstoneTool',
        disabledText: 'Select an MPR viewport to enable this tool',
      },
    },
  },
  {
    id: 'MoreTools',
    uiType: 'ohif.splitButton',
    props: {
      groupId: 'MoreTools',
      evaluate: 'evaluate.group.promoteToPrimaryIfCornerstoneToolNotActiveInTheList',
      primary: createButton({
        id: 'Reset',
        icon: 'tool-reset',
        tooltip: 'Reset View',
        label: 'Reset',
        commands: 'resetViewport',
        evaluate: 'evaluate.action',
      }),
      secondary: {
        icon: 'chevron-down',
        label: '',
        tooltip: 'More Tools',
      },
      items: [
        createButton({
          id: 'Reset',
          icon: 'tool-reset',
          label: 'Reset View',
          tooltip: 'Reset View',
          commands: 'resetViewport',
          evaluate: 'evaluate.action',
        }),
        createButton({
          id: 'rotate-right',
          icon: 'tool-rotate-right',
          label: 'Rotate Right',
          tooltip: 'Rotate +90',
          commands: 'rotateViewportCW',
          evaluate: 'evaluate.action',
        }),
        createButton({
          id: 'flipHorizontal',
          icon: 'tool-flip-horizontal',
          label: 'Flip Horizontal',
          tooltip: 'Flip Horizontally',
          commands: 'flipViewportHorizontal',
          evaluate: 'evaluate.viewportProperties.toggle',
        }),
        createButton({
          id: 'invert',
          icon: 'tool-invert',
          label: 'Invert',
          tooltip: 'Invert Colors',
          commands: 'invertViewport',
          evaluate: 'evaluate.viewportProperties.toggle',
        }),
        createButton({
          id: 'Cine',
          icon: 'tool-cine',
          label: 'Cine',
          tooltip: 'Cine',
          commands: 'toggleCine',
          evaluate: 'evaluate.cine',
        }),
        createButton({
          id: 'ImageSliceSync',
          icon: 'link',
          label: 'Image Slice Sync',
          tooltip: 'Enable position synchronization on stack viewports',
          commands: {
            commandName: 'toggleSynchronizer',
            commandOptions: {
              type: 'imageSlice',
            },
          },
          listeners: {
            [EVENTS.STACK_VIEWPORT_NEW_STACK]: {
              commandName: 'toggleImageSliceSync',
              commandOptions: { toggledState: true },
            },
          },
          evaluate: 'evaluate.cornerstone.synchronizer',
        }),
      ],
    },
  },
];

export default toolbarButtons;
