# PDF Generation
## Preface
Testbefund utilizes QR codes and random IDs to allow secure read and write operations on test results.
If you are not yet familiar with the concept, please head over to [Testbefund.de](https://testbefund.de/)
and get familiar with the concept.

## Printable Codes
Because the physical QR codes are not made out of bits and bytes, we need some way of priting these 
codes. Because of this, the result of a create operation will always be a PDF document, containing
printable QR codes.

These codes will then get printed on a label sheet, with 4 QR codes in one row. 

## Getting the codes
Codes are created through ``easyqrcodejs``, mainly because this library allows us to create
these codes with a header, in the frontend, without having to worry about backend load. The downside
is: ``easyqrcodejs`` can only render into a DOM element.

Because of this, QR code rendering looks like this:
1. Create the ``TestContainer`` via the API
2. Create a hidden DOM element
3. Render the QR code into the hidden DOM element
4. Get the child <img> tag from the DOM element
5. Get the ``src`` of said image, trim off irrelevant data, and transform the base64
 image into binary
6. Pass the binary image data to ``jsPDF``

If you know a smoother way to create these document, please let us know!

## Target format

Please refer to [this store](https://www.etikettenhandel.de/emax_shop_images/endisch/laseretiketten/pdf/50x70_6505070_info.pdf)
