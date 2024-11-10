import React from 'react';
import _getStatusComponent from '/home/adrian/Escritorio/TFG/repositorio/Viewers/extensions/cornerstone-dicom-seg/src/viewports/_getStatusComponent';
import cornerstone from '/home/adrian/Escritorio/TFG/repositorio/Viewers/extensions/cornerstone/src/index';
import { Types, utilities, csUtils, services } from '@cornerstonejs/core';
//import CornerstoneViewportService from '/home/adrian/Escritorio/TFG/repositorio/Viewers/extensions/cornerstone/src/services/ViewportService/CornerstoneViewportService.ts';
import getSegmentationData from './utils/getSegmentationData';



/**
 * Calculate the Jaccard Index for the 2 segments 
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
function calculateIoU({ extensionManager, servicesManager }): number {

  var segmentationData = getSegmentationData({ extensionManager, servicesManager });

  if (segmentationData == null)
    return -1;
  if(segmentationData.length != 2)
    return -2;

  var segBuf = segmentationData[0];
  var gtBuf = segmentationData[1];

  let tp = 0;
  let fp = 0;
  let fn = 0;

  if (segBuf.length != gtBuf.length) return -3;

  for (var i = 0; i != segBuf.length; i++){
    if (segBuf[i] == 1 && gtBuf[i] == 1) {
      tp++;
    } else if (gtBuf[i] == 0 && segBuf[i] == 1) {
      fp++;
    } else if (gtBuf[i] == 1 && segBuf[i] == 0) {
      fn++;
    }
  }
  const iou = tp / (tp + fp + fn);
  return iou;
  return -1;

}
  


export default calculateIoU;


