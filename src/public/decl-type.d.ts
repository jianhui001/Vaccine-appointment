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

export interface Covidcancelapi {
	_id: string;
}

export interface PhyId {
	id: string;
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

export interface Resnuataapi {
	name: string;
	phone: string;
	id_card: string;
	time: string;
}

export interface Nuatauserorder {
	address: string;
	cancel: boolean;
	name: string;
	order_number: string;
	phy_name: string;
	phy_time: string;
	price: number;
	time: string;
	_id: string;
}

export interface Graphics {
	illness: string;
	guide: boolean;
	ins_report: string[];
	patient_id: string;
}
export interface Mypatient {
	age: string;
	born: string;
	id_card: string;
	name: string;
	phone: string;
	relation: string;
	sex: string;
	_id: string;
}
export interface Patientres {
	name: string;
	sex: string;
	born: string;
	relation: string;
	id_card: string;
	phone: string;
}
export interface Phyterm {
	query_val: string;
	_id: string;
	filter_val: string[];
}
export interface Phydata {
	be_suit: string;
	describe: string;
	image: string;
	price: number;
	sales: number;
	title: string;
	_id: string;
}
export interface FilterData {
	type: string;
	sales: string;
	price: string;
}

interface Crowd {
	image: string;
	name: string;
}

interface Content {
	details: string;
	thing: string;
}

interface Project {
	title: string;
	content: Content[];
}

export interface Phydetail {
	image: string;
	price: number;
	sales: number;
	title: string;
	_id: string;
	crowd: Crowd[];
	date: Date[];
	project: Project[];
}

export interface PhyRes {
	phy_name: string;
	phy_time: string;
	patient_id: string;
}

export interface PhyOredr {
	address: string;
	cancel: boolean;
	name: string;
	order_number: string;
	phy_name: string;
	phy_time: string;
	price: number;
	time: string;
	_id: string;
}
interface Options {
	son_id: string;
	title: string;
}
export interface Topic {
	topic: string;
	_id: string;
	options: Options[];
}
interface Recommend {
	dep_id: string;
	dep_name: string;
	hospital: string;
}
export interface Testres {
	result: string;
	scope: string;
	suggest: string;
	_id: string;
	outline: string[];
	recommend: Recommend[] | [];
}
export interface Sharedata {
	type: string;
	name: string;
	share_title: string;
	share_path: string;
	share_url: string;
}