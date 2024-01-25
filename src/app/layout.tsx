import './globals.scss';
import localFont from 'next/font/local';

const helvetica = localFont({
  src: [
    {
      path: './styles/fonts/HelveticaNeueCyr-Light.ttf',
      weight: '300'
    },
    {
      path: './styles/fonts/HelveticaNeueCyr-Roman.ttf',
      weight: '400'
    },
    {
      path: './styles/fonts/HelveticaNeueCyr-Medium.ttf',
      weight: '500'
    },
    {
      path: './styles/fonts/HelveticaNeueCyr-Bold.ttf',
      weight: '700'
    },
  ]
});

export default function RootLayout({ children } : {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={helvetica.className}>{children}</body>
    </html>
  )
}
