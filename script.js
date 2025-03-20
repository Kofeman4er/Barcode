// Generate Barcode
function generateBarcode() {
    let text = document.getElementById("barcodeText").value;
    if (text) {
        JsBarcode("#barcode", text, {
            format: "CODE128",
            displayValue: true
        });
    } else {
        alert("Please enter text to generate a barcode.");
    }
}

// Start Barcode Scanner when input is focused
document.getElementById("scannerInput").addEventListener("focus", startScanner);

function startScanner() {
    let scannerElement = document.getElementById("scanner");
    scannerElement.style.display = "block"; // Show video when scanning starts

    Quagga.init({
        inputStream: {
            name: "Live",
            type: "LiveStream",
            target: scannerElement,
            constraints: {
                width: 640,
                height: 480,
                facingMode: "environment"  // Use rear camera
            }
        },
        decoder: {
            readers: ["code_128_reader", "ean_reader", "ean_8_reader", "upc_reader"]
        }
    }, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        Quagga.start();
    });

    // Process detected barcodes
    Quagga.onDetected(function(result) {
        document.getElementById("scannerInput").value = result.codeResult.code;
        Quagga.stop();
        scannerElement.style.display = "none"; // Hide video after scan
    });
}
