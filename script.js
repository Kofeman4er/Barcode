// Generate Barcode
function generateBarcode() {
    let text = document.getElementById("barcodeText").value;
    if (text.trim() === "") {
        alert("Please enter text to generate a barcode.");
        return;
    }

    JsBarcode("#barcode", text, {
        format: "CODE128",
        displayValue: true
    });
}

// Start Barcode Scanner when input is focused
document.getElementById("barcodeInput").addEventListener("focus", startScanner);

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
        document.getElementById("barcodeInput").value = result.codeResult.code;
        stopScanner();
    });
}

// Stop Scanner
function stopScanner() {
    Quagga.stop();
    document.getElementById("scanner").style.display = "none"; // Hide video after scanning
}

// Submit Barcode
function submitBarcode() {
    let barcode = document.getElementById("barcodeInput").value;
    if (barcode.trim() === "") {
        alert("Please enter or scan a barcode before submitting.");
        return;
    }

    alert("Barcode submitted: " + barcode);
}
