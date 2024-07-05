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
// ------------HPV筛选的导航和疫苗列表----------
export interface Hpvselect {
	name: string;
	_id: string;
}
export interface Hpvlist {
	hpv_id: string;
	name: string;
	describe: string[];
	price: string[];
	_id: string;
}
// -------------hpv详情页-----------------
// 套餐名称
interface HpvName {
	combo: string;
	combo_id: string;
}
export interface Hpvcomboname {
	title: string;
	name: HpvName[];
}
// 接种时间
interface HpvTime {
	time: string;
	time_id: string;
}
export interface Hpvcombotime {
	title: string;
	name: HpvTime[];
}
export interface Hpvorder {
	name: string;
	combo: string;
	ino_time: string;
	price: number;
	hpv_name: string;
	time: string;
	address: string;
	order_number: string;
	cancel: boolean;
	_id: string;
}
interface Date {
	date: string;
	week: string;
}
interface Style {
	title: string;
	desc: string[];
}
export interface Nucleicacid {
	address: string;
	hospital: string;
	logo: string;
	name: string;
	phone: string;
	price: number;
	boon: string[];
	date: Date[];
	style: Style[];
	_id?: string;
}