export interface Vaccine {
	image: string;
	title: string;
}
export interface Phydata {
    describe: string;
	image: string;
	title: string;
}
export interface Registered {
    background: string;
	dep_id: string;
	image: string;
	title: string;
}
export interface Selftest {
	describe: string;
	image: string;
	minute: number;
	name: string;
	number_of_people: number;
	question: number;
}
interface Time {
	end_time: string;
	over: number;
	start_time: string;
	when: number;
}
interface Period {
	period: string;
	time: Time[];
}
interface Week{
	Have: string;
	date: string;
	day: string;
}
export interface Newapptime {
	Hospital: string;
	address: string;
	company: string[];
	lasting: Period[];
	week: Week[];
}
export interface Rescovidapi {
	name: string;
	id_card: string;
	phone: string;
	address: string;
	de_address: string;
	crowd_sort: string;
	date: string;
	period: string;
	reserve_time: string;
	when: number;
}
// ----------新冠疫苗订单------------
export interface Xinguanorder {
	address: string;
	cancel: boolean;
	company: string;
	date: string;
	name: string;
	period: string;
	time: string;
	_id: string;
}