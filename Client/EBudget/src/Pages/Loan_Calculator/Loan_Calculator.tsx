import LoanJS  from 'loanjs';
import { useEffect, useState } from 'react';
import Button from '../../Components/Common/Button/Button';
import Heading from '../../Components/Common/Heading/Heading';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Typography } from '@mui/material'


const Loan_Calculator:React.FC = () => {

    const [Term, setTerm] = useState("")
    const [Amount, setAmount] = useState("")
    const [Errors, setErrors] = useState("")
    const [Totals, setTotals] = useState<any>([])
    const [Interest, setInterest] = useState("")
    const [Installments, setInstallments] = useState<any>([])
    

    const calculateInstallmetPayment= (e: React.FormEvent) => {
        e.preventDefault();  

        if( Term === "" || Amount === "" || Interest === "" ) {
            setErrors("Ensure all the required fields are filled!")
        }
        else {
            setErrors("")
            let Loan =  LoanJS.Loan(Amount, Term* 12, Interest);
            setTotals(Loan)
            setInstallments(Loan.installments);
        }
    };

    useEffect(() => {
        localStorage.setItem("Payments", JSON.stringify(Installments))
    },[Installments]);

return (
    <div className='flex flex-col items-center gap-2 p-2 rounded shadow-Shadow-green text-black w-full'>
        <Heading 
            Heading='Loan Calculator'
            HeadingStyle='font-bold mb-1 text-center text-green-700 text-5xl'
        />
        <section className='flex justify-between m-auto w-9/12' >
            <form  className='flex flex-col gap-8' onSubmit={calculateInstallmetPayment} >
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Loan Amount</label> 
                    <input type='number' placeholder="Loan Amount.." value={Amount} onChange={e => setAmount(e.target.value)}  className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-lg text-black w-80' required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Interest Rate</label> 
                    <input type='number' placeholder="Interest Rate..." value={Interest} onChange={e => setInterest(e.target.value)}  className='bg-inherit border-black border-b h-8 outline-none truncate text-lg px-1 py-1 text-black w-80' required />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Loan Term (Years)</label> 
                    <input type='number' placeholder="Loan Duration..." value={Term} onChange={e => setTerm(e.target.value)}  className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-lg text-black w-80' required />
                </div>
            </form>
            <section className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Total Interest Payable</label>
                    <input type="text" value={Totals.interestSum} readOnly className='bg-inherit border-black border-b font-bold h-8 outline-none text-lg truncate px-1 py-1 text-black w-80' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Total Payment (Loan Amount + Interest)</label>
                    <input type="text" value={Totals.sum} readOnly className='bg-inherit border-black border-b font-bold h-8 outline-none text-lg truncate px-1 py-1 text-black w-80' />
                </div>
            </section>
        </section>
        <p className='font-bold text-center text-red-700' >{Errors}</p>
        <Button
            ButtonText='Calculate'
            ButtonStyle='bg-blue-900 cursor-pointer p-1  rounded text-center text-lg text-white w-40'
            onClick={calculateInstallmetPayment}
        />
        <TableContainer id='Installments' component={Paper} sx={{ maxHeight: '300px' }} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Month</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Payment Amount</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Interest Payment</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Principal Paid</Typography></TableCell>
                        <TableCell align='center'><Typography sx={{ fontWeight: 'bold' }}>Remainder</Typography></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Installments.map((Installment: any, index: any) => (
                            <TableRow key={Installment.id}>
                                <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{index + 1}</Typography></TableCell>
                                <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{Installment.installment}</Typography></TableCell>
                                <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{Installment.interest.toFixed(2)}</Typography></TableCell>
                                <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{Installment.capital.toFixed(2)}</Typography></TableCell>
                                <TableCell align='center' ><Typography sx={{ fontSize: 17 }}>{Installment.remain.toFixed(2)}</Typography></TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
    </div>
)
}

export default Loan_Calculator