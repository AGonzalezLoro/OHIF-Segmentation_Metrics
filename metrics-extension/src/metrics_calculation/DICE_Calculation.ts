import getSegmentationData from '../utils/getSegmentationData';


//truncate metrics
function toFixed(n, fixed) {
  if (!isNaN(n))
      return `${n}`.match(new RegExp(`^-?\\d+(?:\.\\d{0,${fixed}})?`))[0];
  else return "0";
}

/**
 * Calculate the DICE Similarity Coeficient for the 2 segments 
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
function calculateDICE({ extensionManager, servicesManager }):string {

  var segmentationData = getSegmentationData({ extensionManager, servicesManager });
  var returnString = "Dice Similarity Coefficient: "

  if (segmentationData == null)
    return "-1";
  if(segmentationData.length != 2)
    return "-2";

  var segBuf = segmentationData[0];
  var gtBuf = segmentationData[1];


  if (segBuf.length != gtBuf.length) return "-3";
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
  var dice = (2 * intersection) / (seg + gt);

  returnString += toFixed(dice, 4);
  return returnString;

}

export default calculateDICE;