import {test} from 'node:test';
import assert from 'node:assert/strict';
import {streaks,elapsed,skillStats,makeReview} from './core.ts';
import {missions,calendar} from './curriculum.ts';
test('20 distinct sessions across 30 days',()=>{assert.equal(missions.length,20);assert.equal(calendar.length,30);assert.deepEqual(calendar.filter(d=>d.session).map(d=>d.session),Array.from({length:20},(_,i)=>i+1));for(const m of missions){assert.ok(m.brief.length>20);assert.ok(m.constraints.length>=3);assert.equal(m.questions.length,3);assert.ok(m.deliverable.length>30)}});
test('streak deduplicates days and includes yesterday',()=>{const dates=['2026-10-01T12:00:00','2026-10-01T15:00:00','2026-10-02T12:00:00'];assert.deepEqual(streaks(dates,new Date('2026-10-03T12:00:00')),{current:2,longest:2});assert.equal(streaks(dates,new Date('2026-10-04T12:00:00')).current,0);assert.equal(streaks([]).longest,0)});
test('timer derives elapsed from saved timestamp',()=>{assert.equal(elapsed({session:1,phase:0,elapsed:20,started:1000},11000),30);assert.equal(elapsed({session:1,phase:0,elapsed:20,started:null},11000),20);assert.equal(elapsed({session:1,phase:0,elapsed:20,started:20000},11000),20)});
test('skill trends use recent five scores',()=>{const subs=[3,4,5,6,7,8].map(n=>({scores:{Typography:n}})) as any;const stats=skillStats(subs);assert.equal(stats.length,1);assert.equal(stats[0].average,6);assert.equal(stats[0].delta,5);assert.equal(stats[0].count,6)});
test('review is honest about evidence',()=>{const review=makeReview({Typography:4,Composition:8},{aim:'Fast first read',unsure:'Small copy competes'},[]);assert.match(review.issue,/Typography/);assert.match(review.works,/not an independent visual assessment/);assert.match(review.next,/font pairings/)});


test('streak crosses month boundaries and handles gaps',()=>{assert.deepEqual(streaks(['2026-09-29T12:00:00','2026-09-30T12:00:00','2026-10-01T12:00:00','2026-10-03T12:00:00'],new Date('2026-10-03T19:00:00')),{current:1,longest:3})});
test('skill statistics handle no submissions and a single baseline',()=>{assert.deepEqual(skillStats([]),[]);const result=skillStats([{scores:{Composition:7}}] as any)[0];assert.equal(result.delta,0);assert.equal(result.variance,0);assert.equal(result.average,7)});
test('recurring low score receives explicit recommendation',()=>{const prior=[1,2].map(()=>({scores:{Hierarchy:4}})) as any;const review=makeReview({Hierarchy:5,Execution:8},{},prior);assert.match(review.issue,/at least two/);assert.match(review.next,/one typeface/)});
