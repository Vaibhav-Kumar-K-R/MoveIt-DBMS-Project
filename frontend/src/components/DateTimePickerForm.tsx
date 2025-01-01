import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "./ui/form";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";
import { TimePicker } from "./ui/time-picker";

const formSchema = z.object({
	dateTime: z.date(),
});

type FormSchemaType = z.infer<typeof formSchema>;

const DateTimePickerForm = () => {
	const form = useForm<FormSchemaType>({
		resolver: zodResolver(formSchema),
	});

	function onSubmit(values: FormSchemaType) {
		console.log(values);
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<FormField
					control={form.control}
					name="dateTime"
					render={({ field }) => (
						<FormItem className="flex flex-col items-start">
							<FormLabel>Username</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<Button
										variant={"outline"}
										className={cn(
											"w-[240px] justify-start text-left font-normal",
											!field.value && "text-muted-foreground"
										)}
									>
										<CalendarIcon className="mr-2 h-4 w-4" />
										{field.value ? (
											format(field.value, "PPP | HH:mm:ss")
										) : (
											<span>Pick a date</span>
										)}
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-auto p-0" align="start">
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) =>
											date < new Date() &&
											date.getDate() !== new Date().getDate()
										}
										initialFocus
									/>
									<div className="p-3 border-t-2 bg-slate-50">
										<TimePicker date={field.value} setDate={field.onChange} />
									</div>
								</PopoverContent>
							</Popover>
							<FormDescription>
								Select the event date.
							</FormDescription>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="mt-4">
					Submit
				</Button>
			</form>
		</Form>
	);
};

export default DateTimePickerForm;
