import getSegmentationData from '../utils/getSegmentationData';

//truncate metrics
function toFixed(n, fixed) {
  if (!isNaN(n))
      return `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
  else return "0";
}


/**
 * Calculate the Jaccard Index for the 2 segments 
 * displayed. Will fail if the number of SEG displaySets 
 * is different from 2.
 * 
 * @param extensionManager
 * @param servicesManager
 * @returns {string} -Return the coeficient calculated or a error code.
 * ErrorCode = -1 => failed at getting the segmentation labelmaps.
 * ErrorCode = -2 => Number of segmentations different from 2.
 * ErrorCode = -3 => Size of the mask doesn't match.
 */
function calculateIoU({ extensionManager, servicesManager }):string {

  var segmentationData = getSegmentationData({ extensionManager, servicesManager });
  var returnString = "Jaccard Index: "

  if (segmentationData == null)
    return "-1";
  if(segmentationData.length != 2)
    return "-2";

  var segBuf = segmentationData[0];
  var gtBuf = segmentationData[1];

  let tp = 0;
  let fp = 0;
  let fn = 0;

  if (segBuf.length != gtBuf.length) return "-3";

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
  
  returnString += toFixed(iou, 4);
  return returnString;

}
  


export default calculateIoU;


