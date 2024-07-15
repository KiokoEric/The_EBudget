import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Heading from '../../Components/Common/Heading/Heading';
import Button from '../../Components/Common/Button/Button';

interface FormValues {
    Interest: number;
    Amount: number;
    Term: Number;
};

const Loan_Calculator:React.FC = () => {

    const LoanSchema = z.object({
        Interest: z.string().min(1, 'Interest Rate is required'),
        Amount: z.string().min(1, 'Loan Amount is required'),
        Term: z.string().min(1, 'Loan Duration is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
        resolver: zodResolver(LoanSchema),
    });



return (
    <div className='flex flex-col items-center gap-2 p-2 rounded shadow-Shadow-green text-black w-full'>
        <Heading 
            Heading='Loan Calculator'
            HeadingStyle='font-bold mb-1 text-center text-green-700 text-5xl'
        />
        <section className='flex justify-between m-auto w-9/12' >
            <form  className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Loan Amount</label> 
                    <input placeholder="Loan Amount.." {...register('Amount', { required: 'Loan Amount is required' })} className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-80' required />
                    {errors.Amount && <p className="text-center text-red-700">{errors.Amount.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Interest Rate</label> 
                    <input placeholder="Interest Rate..." {...register('Interest', { required: 'Loan interest rate is required' })} className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-80' required />
                    {errors.Interest && <p className="text-center text-red-700">{errors.Interest.message}</p>}
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg' htmlFor="">Loan Term (Years)</label> 
                    <input placeholder="Loan Duration..." {...register('Term', { required: 'Loan duration is required' })} className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-80' required />
                    {errors.Term && <p className="text-center text-red-700">{errors.Term.message}</p>}
                </div>
            </form>
            <section className='flex flex-col gap-8'>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Total Interest Payable</label>
                    <input type="text" readOnly className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-80' />
                </div>
                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-lg'>Total Payment (Loan Amount + Interest)</label>
                    <input type="text" readOnly className='bg-inherit border-black border-b h-8 outline-none truncate px-1 py-1 text-black w-80' />
                </div>
            </section>
        </section>
        <Button
            ButtonText='Calculate'
            ButtonStyle='bg-blue-900 cursor-pointer p-1  rounded text-center text-lg text-white w-40'
        />
    </div>
)
}

export default Loan_Calculator