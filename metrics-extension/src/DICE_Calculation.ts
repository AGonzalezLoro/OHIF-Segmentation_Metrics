import React, { useCallback } from 'react';
import _getStatusComponent from '/home/adrian/Escritorio/TFG/repositorio/Viewers/extensions/cornerstone-dicom-seg/src/viewports/_getStatusComponent';
import cornerstone, { Types, utilities, csUtils, services } from '@cornerstonejs/core';
import { CornerstoneViewportService, segmentation, ToolGroupManager } from '@cornerstonejs/tools';
import { calculateSimilarityDiceCoefficient } from './utils/similarityUtils';
import GetImageDataFromViewport from './utils/getSegmentationData';
import getImageSrcFromImageId from '/home/adrian/Escritorio/TFG/repositorio/Viewers/extensions/default/src/Panels/getImageSrcFromImageId';
import getSegmentationData from './utils/getSegmentationData';



/**
 * Calculate the DICE Similarity Coeficient for the 2 segments 
 * displayed. Will fail if the number of SEG displaySets 
 * is different from 2.
 * 
 * @param extensionManager
 * @param servicesManager
 * @returns {number} -Return the coeficient calculated or a error code.
 * ErrorCode = -1 => failed at getting the segmentation labelmaps.
 * ErrorCode = -2 => Number of segmentations different from 2.
 * ErrorCode = -3 => Size of the mask doesn't match.
 */
function calculateDICE({ extensionManager, servicesManager }) {

  var segmentationData = getSegmentationData({ extensionManager, servicesManager });

  if (segmentationData == null)
    return -1;
  if(segmentationData.length != 2)
    return -2;

  var segBuf = segmentationData[0];
  var gtBuf = segmentationData[1];


  if (segBuf.length != gtBuf.length) return -3;
  var intersection = 0;
  var seg = 0;
  var gt = 0;

  for (var i = 0; i != segBuf.length; i++) {
    if (segBuf[i] != 0)
      seg++;
    if (gtBuf[i] != 0) {
      gt++;
      if (segBuf[i] == gtBuf[i])
        intersection++;
    }

  }
  return (2 * intersection) / (seg + gt);
  return -1;
}

export default calculateDICE;