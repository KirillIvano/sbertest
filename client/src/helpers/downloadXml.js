export const downloadDiagram = (fileName, xml) => {
    const encodedData = encodeURIComponent(xml);
    const tempLink = document.createElement('a');
    tempLink.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData;
    tempLink.download = `${fileName}.bpmn`;
    tempLink.click();
};
