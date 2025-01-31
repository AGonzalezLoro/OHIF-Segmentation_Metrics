import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useViewportGrid } from '@ohif/ui';
import { useNavigate } from 'react-router-dom';
import { segmentation, cornerstone } from '@cornerstonejs/tools';
import { getPixels } from '@ohif/extension-cornerstone'
import getImageSrcFromImageId from './getImageSrcFromImageId';
import { utilities, ViewportGridService, cache } from '@cornerstonejs/core';
import {
  Enums as csToolsEnums,
  segmentation as cstSegmentation,
  Types as cstTypes,
} from '@cornerstonejs/tools';
import { SegmentationRepresentations } from '@cornerstonejs/tools/enums';



/**
 * Get the segmentation labelmaps of the slice shown on the 
 * active viewport from the SEG displaySets. 
 *
 * @param extensionManager
 * @param servicesManager
 * @returns {Array<Uint8Array>} -Array containing the segmentation labelmaps.
 * Can return -1 or an empty array in case of error.
 */
function getSegmentationData({ extensionManager, servicesManager }){
  const { displaySetService, segmentationService } = servicesManager.services;

  var segmentationData = [];
  const segmentations = segmentationService.getSegmentations();
  if (!segmentations.length)
    return -1;
  const displaySets = displaySetService.getActiveDisplaySets();
  displaySets.map(dSet => {
    if (dSet.Modality == "SEG") {
      var segData = _getSegmentationData({ extensionManager, servicesManager }, dSet);
      segmentationData.push(segData);
    }
  });
  return segmentationData;
}


/**
 * Get the segmentation labelmap of the slice shown on the 
 * active viewport from the input SEG displaySet. 
 *
 * @param extensionManager
 * @param servicesManager
 * @param displaySet -DisplaySet containing the segmentation.
 * @returns {Uint8Array} -Uint8Array with the labelmap. Can return
 * an empty array in case of error.
 */
function _getSegmentationData({ extensionManager, servicesManager }, displaySet) {

  const dataSource = extensionManager.getDataSources()[0];
  const { displaySetService, segmentationService } = servicesManager.services;
  const currentDisplaySets = displaySetService.activeDisplaySets;

  const { 
    cornerstoneViewportService,
    viewportGridService,
    ViewportActionCornersService,
   } = servicesManager.services;

  const viewportId = viewportGridService.getActiveViewportId();
  const gridState = viewportGridService.getState();
  const presentations = cornerstoneViewportService.getPresentations(viewportId);


  let options = {
    segmentationId: null,
    segments: null,
    FrameOfReferenceUID: null,
    label: "",
  }
  var labelmapVolume = new Uint8Array(displaySet.labelmapBufferArray[0]);
  if (!labelmapVolume) {
    segmentationService.createLabelmapForDisplaySet(displaySet, options).then(result => {
      labelmapVolume = segmentationService.getLabelmapVolume(result);
      const rows = displaySet.instance.Rows;
      const cols = displaySet.instance.Columns;
      const frame = presentations.positionPresentation.viewReference.sliceIndex;
    
      return labelmapVolume.slice(rows * cols * (frame - 1), rows * cols * frame);
    
    });
  }
  console.log(presentations);
  const frame = presentations.positionPresentation.viewReference.sliceIndex;
  const rows = displaySet.instance.Rows;
  const cols = displaySet.instance.Columns;
  
  return labelmapVolume.slice(rows * cols * frame, rows * cols * (frame + 1));

  return null;
}


export default getSegmentationData;