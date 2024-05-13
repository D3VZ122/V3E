import { ChangeEvent } from "react";


interface inputlabel{
    label:string;
    placeholder:string;
    onChange:(e:ChangeEvent<HTMLInputElement>) => void;
    type?:string;

}
export default function  LabbeledInputs({label,placeholder,onChange,type}:inputlabel){
    return <div>
            <div className="w-full">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray pt-2">{label}</label>
            <input onChange={onChange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " placeholder={placeholder} required />
        </div>
    </div>
}