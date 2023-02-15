function getProps(products = [], name = '', address = '', phone = '') {
  let tableData = products.map((pro, index) => {
    let result = [index];
    result.push(pro.name);
    result.push(pro.price + ' $');
    result.push(pro.number);
    result.push(pro.number * pro.price + ' $');
    return result;
  });

  let totalPrice = products.reduce((prev, curr) => {
    return prev + curr.number * curr.price;
  }, 0);

  tableData.push(['', '', '', 'Total:', totalPrice.toLocaleString(undefined, { minimumFractionDigits: 0 }) + ' $']);
  tableData.push(['', '', '', 'Tax:', '10%']);
  tableData.push([
    '',
    '',
    '',
    'Payment:',
    (totalPrice * 1.1).toLocaleString(undefined, { minimumFractionDigits: 0 }) + ' $',
  ]);

  let time = moment(new Date()).format('DD-MM-YYYY HH:mm:ss');

  return {
    outputType: jsPDFInvoiceTemplate.OutputType.Save,
    returnJsPDFDocObject: true,
    fileName: 'NFTs Invoice',
    orientationLandscape: false,
    compress: true,
    logo: {
      src: 'https://res.cloudinary.com/liushizi/image/upload/v1676426493/logo_cknob4.png',
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 30, //aspect ratio = width/height
      height: 30,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    stamp: {
      src: 'https://res.cloudinary.com/liushizi/image/upload/v1676426506/link_d8qcdj.png',
      type: 'PNG', //optional, when src= data:uri (nodejs case)
      width: 50, //aspect ratio = width/height
      height: 50,
      margin: {
        top: 0, //negative or positive num, from the current position
        left: 0, //negative or positive num, from the current position
      },
    },
    business: {
      name: 'NFTs',
      address: '2252/50, Tan Chanh Hiep, Quan 12, TP.HCM',
      phone: '+84123456789',
      email: 'nfts@gmail.com',
      email_1: 'https://shizi1999.github.io/fe-fr/#!/',
    },
    contact: {
      label: 'Invoice #: ' + Math.floor(Math.random() * 20),
      name: 'NFTs Invoice',
      address: 'Customer: ' + name,
      phone: 'Phone: ' + phone,
      email: 'Address: ' + address,
      otherInfo: 'Time Order: ' + time,
    },
    invoice: {
      headerBorder: false,
      tableBodyBorder: false,
      header: [
        {
          title: 'STT',
          style: {
            width: 10,
            fontsize: 14,
          },
        },
        {
          title: 'Name',
          style: {
            width: 50,
            fontsize: 14,
          },
        },
        { title: 'Price', style: { fontsize: 14 } },
        { title: 'Quantity', style: { fontsize: 14 } },
        { title: 'Total', style: { fontsize: 14 } },
      ],
      table: tableData,
      invDescLabel: 'Thankyou!',
      invDesc:
        'Thank you for your purchase. If you get some problems, please contact with us by hotline: +84123456789 or nfts@gmail.com',
    },
    footer: {
      text: '© 2023 NFTs. All rights reserved!',
    },
    pageEnable: true,
    pageLabel: 'Page ',
  };
}

function generatePdf(products = [], name = '', address = '', phone = '') {
  var pdfObject = jsPDFInvoiceTemplate.default(getProps(products, name, address, phone));
}
