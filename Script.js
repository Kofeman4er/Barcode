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

// Start Barcode Scanner
function startScanner() {
    let scannerElement = document.getElementById("scanner");
    
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
        document.querySelector("#scanResult span").textContent = result.codeResult.code;
        Quagga.stop();
    });
}
