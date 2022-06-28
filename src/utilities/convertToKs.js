export default function convertToKs(value) {
  const valueInK = value/1000;
  
  return valueInK.toFixed(1).toString() + 'k';
}