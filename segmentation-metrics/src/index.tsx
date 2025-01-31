import { hotkeys } from '@ohif/core';
import { id } from './id';
import toolbarButtons from './toolbarButtons';

import segmentationButtons from '../../../Viewers/modes/segmentation/src/segmentationButtons';
import initToolGroups from '../../../Viewers/modes/segmentation/src/initToolGroups';


const ohif = {
  layout: '@ohif/extension-default.layoutTemplateModule.viewerLayout',
  sopClassHandler: '@ohif/extension-default.sopClassHandlerModule.stack',
  hangingProtocol: '@ohif/extension-default.hangingProtocolModule.default',
  leftPanel: '@ohif/extension-default.panelModule.seriesList',
  rightPanel: '@ohif/extension-default.panelModule.measure',
};

const metrics = {
  panel: 'metrics-extension.panelModule.metrics',
  hangingProtocol: 'metrics-extension.hangingProtocolModule.metricsHangingProtocol',
};

const cornerstone = {
  viewport: '@ohif/extension-cornerstone.viewportModule.cornerstone',
};

const segmentation = {
  panel: '@ohif/extension-cornerstone-dicom-seg.panelModule.panelSegmentation',
  panelTool: '@ohif/extension-cornerstone.panelModule.panelSegmentationWithTools',
  sopClassHandler: '@ohif/extension-cornerstone-dicom-seg.sopClassHandlerModule.dicom-seg',
  viewport: '@ohif/extension-cornerstone-dicom-seg.viewportModule.dicom-seg',
};


/**
 * Just two dependencies to be able to render a viewport with panels in order
 * to make sure that the mode is working.
 */
const extensionDependencies = {
  '@ohif/extension-default': '^3.0.0',
  '@ohif/extension-cornerstone': '^3.0.0',
  '@ohif/extension-cornerstone-dicom-seg': '^3.0.0',
  '@ohif/extension-test': '^0.0.1',
  'metrics-extension': '^0.0.1',
  '@ohif/extension-tmtv': '^3.0.0',
};

function modeFactory({ modeConfiguration }) {
  return {
    /**
     * Mode ID, which should be unique among modes used by the viewer. This ID
     * is used to identify the mode in the viewer's state.
     */
    id,
    routeName: 'segmentation_metrics',
    /**
     * Mode name, which is displayed in the viewer's UI in the workList, for the
     * user to select the mode.
     */
    displayName: 'Segmentation metrics',
    /**
     * Runs when the Mode Route is mounted to the DOM. Usually used to initialize
     * Services and other resources.
     */
    onModeEnter: ({ servicesManager, extensionManager, commandsManager }: withAppTypes) => {
      const {
        measurementService,
        toolbarService,
        toolGroupService,
        hangingProtocolService
      } = servicesManager.services;

      measurementService.clearMeasurements();

      // Init Default and SR ToolGroups
      initToolGroups(extensionManager, toolGroupService, commandsManager);

      toolbarService.addButtons(toolbarButtons);
      toolbarService.addButtons(segmentationButtons);

      toolbarService.createButtonSection('primary', [
        'MeasurementTools',
        'Zoom',
        'WindowLevel',
        'Pan',
        'Layout',
        'MoreTools',
      ]);
      toolbarService.createButtonSection('segmentationToolbox', ['BrushTools', 'Shapes']);
    },
    onModeExit: ({ servicesManager }: withAppTypes) => {
      const {
        toolGroupService,
        syncGroupService,
        segmentationService,
        cornerstoneViewportService,
        uiDialogService,
        uiModalService,
      } = servicesManager.services;

      uiDialogService.dismissAll();
      uiModalService.hide();
      toolGroupService.destroy();
      syncGroupService.destroy();
      segmentationService.destroy();
      cornerstoneViewportService.destroy();
    },
    /** */
    validationTags: {
      study: [],
      series: [],
    },
    /**
     * A boolean return value that indicates whether the mode is valid for the
     * modalities of the selected studies. For instance a PET/CT mode should be
     */
    isValidMode: ({ modalities }) => {
      const modalitiesArray = modalities.split('\\');

      return {
        valid: true,
        // modalitiesArray.includes('SEG') && 
        // !modalitiesArray.includes(['SM', 'US', 'MG', 'OT', 'DOC', 'CR']),
        description:
          'The mode only support studies that contains the SEG modality and don\'t include include the following modalities: SM, US, MG, OT, DOC, CR',
      };
    },
    /**
     * Mode Routes are used to define the mode's behavior. A list of Mode Route
     * that includes the mode's path and the layout to be used. The layout will
     * include the components that are used in the layout. For instance, if the
     * default layoutTemplate is used (id: '@ohif/extension-default.layoutTemplateModule.viewerLayout')
     * it will include the leftPanels, rightPanels, and viewports. However, if
     * you define another layoutTemplate that includes a Footer for instance,
     * you should provide the Footer component here too. Note: We use Strings
     * to reference the component's ID as they are registered in the internal
     * ExtensionManager. The template for the string is:
     * `${extensionId}.{moduleType}.${componentId}`.
     */
    routes: [
      {
        path: 'template',
        layoutTemplate: ({ location, servicesManager }) => {
          return {
            id: ohif.layout,
            props: {
              leftPanels: [ohif.leftPanel],
              rightPanels: [segmentation.panelTool, metrics.panel],
              
              viewports: [
                {
                  namespace: segmentation.viewport,
                  displaySetsToDisplay: [segmentation.sopClassHandler],
                },
                {
                  namespace: cornerstone.viewport,
                  displaySetsToDisplay: [ohif.sopClassHandler],
                },
                
              ],
            },
          };
        },
      },
    ],
    extensions: extensionDependencies,
    hangingProtocol: metrics.hangingProtocol,
    
    sopClassHandlers: [
      ohif.sopClassHandler,
      segmentation.sopClassHandler
    ], 
    hotkeys: [...hotkeys.defaults.hotkeyBindings],
  };
}

const mode = {
  id,
  modeFactory,
  extensionDependencies,
};

export default mode;
