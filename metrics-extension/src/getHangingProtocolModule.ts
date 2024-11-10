
const defaultProtocol = {
  id: 'metrics-extension.hangingProtocolModule.metricsHangingProtocol',
  locked: true,
  name: 'Default',
  createdDate: '2021-02-23T19:22:08.894Z',
  modifiedDate: '2023-04-01',
  availableTo: {},
  editableBy: {},
  callbacks: {},
  protocolMatchingRules: [
    {
      attribute: 'ModalitiesInStudy',
      constraint: {
        contains: ['SEG', 'CT'],
      },
    },
  ],
  toolGroupIds: ['segTool'],
  numberOfPriorsReferenced: 0,
  defaultViewport: {
    viewportOptions: {
      viewportType: 'volume',
      toolGroupId: 'segTool',
      allowUnmatchedView: true,
    },
  },
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
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: true,
                target: true,
              },
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
                options: {
                  syncColormap: true,
                },
              },
            ],
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
            syncGroups: [
              {
                type: 'cameraPosition',
                id: 'axialSync',
                source: true,
                target: true,
              },
              {
                type: 'voi',
                id: 'ctWLSync',
                source: true,
                target: true,
                options: {
                  syncColormap: true,
                },
              },
            ],
          },
          displaySets: [
            {
              id: 'segDisplaySet',
              matchedDisplaySetsIndex: 0,
            },
          ],
        },
      ],
      createdDate: '2021-02-23T18:32:42.850Z',
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
