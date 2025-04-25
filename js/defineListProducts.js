// Khai báo các items camera
const cameras = [
    {
        title: 'Máy ảnh Nikon D850 (Body Only)',
        imageSrc: '../img/products/Camera/nikon-d8502-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫'
    },
    {
        title: 'Máy ảnh Nikon D780 + Lens 24-120mm F/4G ED Nano',
        imageSrc: '../img/products/Camera/nikon-d780-with-24-120-lens-7-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫'
    },
    {
        title: 'Máy ảnh Nikon D6 Body Only',
        imageSrc: '../img/products/Camera/nikon-d6-01-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 850D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-850d-body-2-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 77D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-77d-500x500.jpg',
        price: '35.990.000₫',
        comparePrice: '44.000.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 6D Mark II',
        imageSrc: '../img/products/camera/canon-eos-6d-ii-with-24-105-f4l-ii-1-500x500.webp',
        price: '44.680.000₫',
        comparePrice: '53.080.000₫'
    }, {
        title: 'Máy ảnh Canon EOS 5D Mark IV (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-5d-mark-iv-500x500.webp',
        price: '36.290.000₫',
        comparePrice: '54.990.000₫'
    },
]

// Khai báo các items ống kính
const lenses = [
    {
        title: 'Canon RF 70-200mm f/4L IS USM',
        imageSrc: '../img/products/Lens/Canon-RF-70-200mm-f4L-IS-USM.jpg',
        price: '52.990.000₫',
        comparePrice: '57.990.000₫'
    },
    {
        title: 'Canon RF 24mm f/1.8 Macro IS STM',
        imageSrc: '../img/products/Lens/Canon-RF-24mm-f1.8-Macro-IS-STM.jpg',
        price: '50.990.000₫',
        comparePrice: '65.990.000₫'
    },
    {
        title: 'Canon RF 135mm f/1.8 L IS USM',
        imageSrc: '../img/products/Lens/Canon-RF-135mm-f1.8-L-IS-USM.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Nikon NIKKOR Z DX 18-140mm f/3.5-6.3 VR',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-DX-18-140mm-f3.5-6.3-VR.jpg',
        price: '61.990.000₫',
        comparePrice: '70.990.000₫'
    },
    {
        title: 'Nikon NIKKOR Z 800mm f/6.3 VR S',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-800mm-f6.3-VR-S.jpg',
        price: '69.990.000₫',
        comparePrice: '175.990.000₫'
    },
    {
        title: 'Samyang AF 35-150mm f/2-2.8 FE (Chính hãng)',
        imageSrc: '../img/products/Lens/samyang-35-150-1.webp',
        price: '30.980.000₫',
        comparePrice: ''
    },
    {
        title: 'Nikon NIKKOR Z 85mm f/1.2 S',
        imageSrc: '../img/products/Lens/Nikon-NIKKOR-Z-85mm-f1.2-S.webp',
        price: '65.000.000₫',
        comparePrice: '69.900.000₫'
    },
    {
        title: 'Samyang AF 75mm f/1.8 Fujifilm X',
        imageSrc: '../img/products/Lens/samyang-75mm-x-1.webp',
        price: '9.900.000₫',
        comparePrice: ''
    },
]

// Khai báo các items máy quay phim
const camcorders = [
    {
        title: "Máy quay phim Z CAM E2 Professional 4K Cinema Camera",
        imageSrc: "../img/products/Camcorder/z-cam-e2-1-500x500.webp",
        price: "53.190.000₫",
        comparePrice: ""
    },
    {
        title: "Blackmagic Pocket Cinema Camera 6K Pro",
        imageSrc: "../img/products/Camcorder/blackmagic-6k-pro-2-500x500.webp",
        price: "59.990.000₫",
        comparePrice: "65.500.000₫"
    },
    {
        title: "Máy quay phim Sony FX3 | Nhập Khẩu",
        imageSrc: "../img/products/Camcorder/sony-fx3-1-500x500.webp",
        price: "82.990.000₫",
        comparePrice: "89.990.000₫"
    },
    {
        title: "Máy quay phim Canon XA55",
        imageSrc: "../img/products/Camcorder/canon-xa55-500x500.webp",
        price: "29.990.000₫",
        comparePrice: ""
    },
    {
        title: "Máy Quay Phim Canon XF705",
        imageSrc: "../img/products/Camcorder/canon-xf705-01-500x500.webp",
        price: "32.500.000₫",
        comparePrice: "34.990.000₫"
    },
    {
        title: "Máy quay phim Canon EOS C70 (Body Only)",
        imageSrc: "../img/products/Camcorder/canon-c70-cinema-camera-rf-mount-1-500x500.webp",
        price: "29.990.000₫",
        comparePrice: "35.000.000₫"
    },
];

const accessories = [];
const drones = [];

// Danh sách tất cả sản phẩm
const allProducts = [...cameras, ...lenses, ...camcorders, ...accessories, ...drones];

// Tìm các sản phẩm có comparePrice (tức là có khuyến mãi) để hiển thị trên flash sale
const promotions = allProducts
    .filter(product => product.comparePrice && product.comparePrice.trim() !== "")
    .slice(0, 5);

const newproducts = [
    {
        title: 'Blackmagic Pocket Cinema Camera 6K Pro',
        imageSrc: '../img/products/NewProducts/blackmagic-6k-pro-2-500x500.webp',
        price: '58.900.000₫',
        comparePrice: '64.000.000₫'
    },
    {
        title: 'Máy quay phim Sony FX3 | Nhập Khẩu',
        imageSrc: '../img/products/NewProducts/sony-fx3-1-500x500.webp',
        price: '27.890.000₫',
        comparePrice: '30.000.000₫'
    },
    {
        title: 'Canon RF 70-200mm f/4L IS USM',
        imageSrc: '../img/products/NewProducts/Canon-RF-70-200mm-f4L-IS-USM.webp',
        price: '32.890.000₫',
        comparePrice: '36.000.000₫'
    },
    {
        title: 'Máy quay phim Canon XA65',
        imageSrc: '../img/products/NewProducts/canon-xa55-500x500.webp',
        price: '28.990.000₫',
        comparePrice: '32.000.000₫'
    },
    {
        title: 'Canon RF 24mm f/1.8 Macro IS STM',
        imageSrc: '../img/products/NewProducts/Canon-RF-24mm-f1.8-Macro-IS-STM.webp',
        price: '18.900.000₫',
        comparePrice: '21.000.000₫'
    },
    {
        title: 'Máy Quay Phim Canon XF 705',
        imageSrc: '../img/products/NewProducts/canon-xf705-01-500x500.webp',
        price: '32.800.000₫',
        comparePrice: '36.000.000₫'
    },
    {
        title: 'Máy quay phim Canon EOS C70 (Body Only)',
        imageSrc: '../img/products/NewProducts/canon-c70-cinema-camera-rf-mount-1-500x500.webp',
        price: '118.000.000₫',
        comparePrice: '125.000.000₫'
    },
    {
        title: 'Canon RF 135mm f/1.8 L IS USM',
        imageSrc: '../img/products/NewProducts/Canon-RF-135mm-f1.8-L-IS-USM.webp',
        price: '77.690.000₫',
        comparePrice: '82.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z DX 18-140mm f/3.5-6.3 VR',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-DX-18-140mm-f3.5-6.3-VR.webp',
        price: '19.800.000₫',
        comparePrice: '21.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z 800mm f/6.3 VR S',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-800mm-f6.3-VR-S.webp',
        price: '160.000.000₫',
        comparePrice: '170.000.000₫'
    },
    {
        title: 'Samyang AF 35-150mm f/2-2.8 FE (Sony E-mount)',
        imageSrc: '../img/products/NewProducts/samyang-35-150-1.webp',
        price: '30.800.000₫',
        comparePrice: '34.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z 85mm f/1.2 S',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-85mm-f1.2-S.webp',
        price: '86.000.000₫',
        comparePrice: '93.000.000₫'
    }
];

const featuredProducts = [
    {
        title: 'Canon RF 24mm f/1.8 Macro IS STM',
        imageSrc: '../img/products/NewProducts/Canon-RF-24mm-f1.8-Macro-IS-STM.webp',
        price: '18.900.000₫',
        comparePrice: '21.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z DX 18-140mm f/3.5-6.3 VR',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-DX-18-140mm-f3.5-6.3-VR.webp',
        price: '19.800.000₫',
        comparePrice: '21.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z 800mm f/6.3 VR S',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-800mm-f6.3-VR-S.webp',
        price: '160.000.000₫',
        comparePrice: '170.000.000₫'
    },
    {
        title: 'Nikon NIKKOR Z 85mm f/1.2 S',
        imageSrc: '../img/products/NewProducts/Nikon-NIKKOR-Z-85mm-f1.2-S.webp',
        price: '86.000.000₫',
        comparePrice: '93.000.000₫'
    },
    {
        title: 'Máy ảnh Nikon D850 (Body Only)',
        imageSrc: '../img/products/Camera/nikon-d8502-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫'
    },
    {
        title: 'Máy ảnh Nikon D780 + Lens 24-120mm F/4G ED Nano',
        imageSrc: '../img/products/Camera/nikon-d780-with-24-120-lens-7-500x500.jpg',
        price: '50.990.000₫',
        comparePrice: '57.990.000₫'
    },
    {
        title: 'Máy ảnh Nikon D6 Body Only',
        imageSrc: '../img/products/Camera/nikon-d6-01-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 850D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-850d-body-2-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 77D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-77d-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 850D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-850d-body-2-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 77D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-77d-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
    {
        title: 'Máy ảnh Canon EOS 850D (Body Only)',
        imageSrc: '../img/products/camera/canon-eos-850d-body-2-500x500.jpg',
        price: '69.990.000₫',
        comparePrice: '75.990.000₫'
    },
];