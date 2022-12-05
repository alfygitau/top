/** @jsx jsx */
import {useEffect} from "react";
import { jsx, Box, Grid, Heading, Text} from 'theme-ui';
import Lets from 'assets/footer/lets.png';
import Mcafee from 'assets/footer/mcafee.png';
import Paypal from 'assets/footer/paypal.png';
import Visa from 'assets/footer/visa.png';
import { useRouter } from "next/router";

export default function Footer() {
    const router = useRouter();

    useEffect(() => {
            const elementVerified = document.querySelector('.verified');
            function myFunction(x) {
                if (x.matches) { // If media query matches
                    elementVerified.style.display = 'none';
                } else {
                    elementVerified.style.display = "flex";
                    elementVerified.style.justifyContent = "center";
                }
            }
            let x = window.matchMedia("(max-width: 700px)")
            myFunction(x);
            x.addListener(myFunction);
    }, [])
  return (
    <footer sx={styles.footer}>
          <Grid sx={styles.footer.grid}>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>COMPANY</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li onClick={() => { router.push('/footer/fags'); scroll(0, 0)}}>FAQ</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>LEGAL</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li  onClick={() => { router.push('/footer/privacy-policy'); scroll(0, 0)}}>Privacy Policy</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>SERVICES</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                  <li  onClick={() => { router.push('/footer/terms-and-conditions'); scroll(0, 0)}}>Terms and Conditions</li>
                  </ul>
                  </center>
              </Box>
              <Box>
                  <Heading as="h1" sx={styles.footer.heading}>TOPRATED</Heading>
                  <center>
                  <ul style={{fontSize:"16px", cursor:"pointer"}}>
                      <li  onClick={() => { router.push('/footer/money-back'); scroll(0, 0)}}>Moneyback Guarantee</li>
                  </ul>
                  </center>
              </Box>
          </Grid>
        <Grid>
                <ul className='verified'>
                    <li><img src={Lets} alt="lets_encrypt" width="200px" height="70px"/></li>
                    <li><img src={Mcafee} alt="mcafee" width="100px"/></li>
                    <li><img src={Paypal} alt="paypal" width="100px"/></li>
                    <li><img src={Visa} alt="visa" width="100px"/></li>
                </ul>
            <p style={{lineHeight: 1.5, textAlign: 'center',  color: '#A1A9B3', paddingLeft: "50px", paddingRight:"50px"}}>
                Write My Paper for Cheap |
                Fast Essay Writing Service |
                Pay for Term Papers  |
                How to Write a Good Essay  |
                Buy Cheap Essays |
                Free Essays |
                Cheap Custom Essays |
                Research Papers for Sale |
                College Essay Writing Service |
                Term Paper Writing Service |
                Write My College Essay |
                Buy College Essays |
                Cheap Dissertation |
                Buy Apa Papers |
                Case Study Writing Service |
                Article Review Writing Service  |
                Research Proposal Writing Service
            </p>
            <Text sx={{textAlign: 'center',color: '#A1A9B3'}}>Rated 4.8 / 5 based on Reviews. |All Reviews</Text>
            <Text sx={{textAlign: 'center',  color: '#A1A9B3'}}>All Rights Reserved</Text>
        </Grid>
    </footer>
  );
}

const styles = {
  footer: {
      fontFamily: 'body',
      backgroundColor: '#242a35',
      grid: {
          pt: [0, null, null, null, null, null, 2],
          px: [5, 6, 0, null, 7, 8, 7],
          gridGap: [
              '40px 0',
              null,
              '45px 30px',
              null,
              '60px 50px',
              '70px 50px',
              null,
              '80px 90px',
          ],
          gridTemplateColumns: ['repeat(1,1fr)', 'repeat(2,1fr)',  'repeat(2,1fr)', 'repeat(4,1fr)'],
      },
      heading: {
          fontFamily: 'Quicksand, sans-serif',
          color: 'primary',
          ml: 4,
          textAlign:'center',
          fontSize: [25, null, 30],
          '@media screen and (max-width:768px)': {
              textAlign: 'center',
              ml: 0,
          },
      },
      ul: {
          listStyle: 'none',
          li: {
              lineHeight: 2.0,
              color: "white",
              p: [1, null, 1.9],
              '@media screen and (max-width:768px)': {
                  textAlign: 'center',
              },
          }
      },
  }
};
