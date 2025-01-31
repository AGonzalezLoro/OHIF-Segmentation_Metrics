
const defaultProtocol = {
  id: 'metrics-extension.hangingProtocolModule.metricsHangingProtocol',
  // locked: false,
  name: 'metrics_hp',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
  callbacks: {},
  imageLoadStrategy: 'interleaveTopToBottom',
  
  displaySetSelectors: {
    segDisplaySet: {
      seriesMatchingRules: [
        {
          attribute: 'Modality',
          constraint: {
            contains: 'SEG',
          },
        },
      ],
    },
  },

  stages: [
    {
      name: 'default',
      viewportStructure: {
        layoutType: 'grid',
        properties: {
          rows: 1,
          columns: 2,
        },
      },
      viewports: [
        {
          viewportOptions: {
            viewportType: 'stack',
            allowUnmatchedView: true,
            
          },
          displaySets: [
            {
              id: 'segDisplaySet',
              matchedDisplaySetsIndex: 1,
            },
          ],
        },
        {
          viewportOptions: {
            viewportType: 'stack',
            allowUnmatchedView: true,
        
          },
          displaySets: [
            {
              id: 'segDisplaySet',
              matchedDisplaySetsIndex: 0,
            },
          ],
        },
      ],
    },
  ],
};

function getHangingProtocolModule() {
  return [
    {
      name: defaultProtocol.id,
      protocol: defaultProtocol,
    }
  ];
}

export default getHangingProtocolModule;
