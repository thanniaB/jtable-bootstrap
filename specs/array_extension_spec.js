/*global describe*/
/*global it*/
/*global beforeEach*/
/*global expect*/

'use strict';

describe('ArrayExtension', function () {

    var children = [], people = [];


    beforeEach(function () {
        children = [
            {name: 'ana', sex: 'f'},
            {name: 'fosto', sex: 'm'},
            {name: 'jane', sex: 'f'},
            {name: 'yadi', sex: 'f'},
            {name: 'lili', sex: 'f'},
            {name: 'bany', sex: 'm'},
            {name: 'rod', sex: null},
            {name: 'auro', sex: 'f'},
            {name: 'martin', sex: 'm'}
        ];
    });

    beforeEach(function () {
        people = [
            {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
            {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
            {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
        ];
    });

    describe('#each', function () {

        beforeEach(function () {
            people = [
                {name: 'pedro', age: 19 },
                {name: 'juan', age: 15 },
                {name: 'pablo', age: 16 },
                {name: 'pancho', age: 20 },
                {name: 'topo', age: 18 }];
        });

        it('do an operation on elements', function () {
            var total = 0;
            people.each(function (person, index) {
                total += index;
            });
            expect(total).toBe(10);
        });

    });

    describe('#where', function () {

        it('creates a new array based on condition', function () {
            var acceptedPeople;
            acceptedPeople = people.where(function (dev) {
                var skills = dev.skills.where(function (skill) { return skill === 'PHP'; });
                return skills.length === 0;
            });

            expect(acceptedPeople.length).toBe(2);
        });

    });

    describe('#any', function () {

        it('satisfy the condition', function () {

            var acceptedPeople = people.where(function (dev) {
                return !dev.skills.any('PHP');
            });

            expect(acceptedPeople.length).toBe(2);

        });
    });

    describe('#select', function () {

        it('return an array with the elements required', function () {

            var hires = people.where(function (dev) {
                return !dev.skills.any('PHP');
            })
                .select(function (dev) {
                    return dev.name;
                });

            expect(hires.length).toBe(2);
        });

    });

    describe('#take', function () {

        it('return the elements required', function () {
            var sons = children.take(3, function (x) { return x.sex === 'f'; });
            expect(sons.length).toBe(3);
        });

    });

    describe('#skip', function () {

        it('returns new array without the first 3 elements', function () {
            var childs = children.skip(3);
            expect(childs.length).toBe(6);
        });

    });

    describe('#first', function () {

        describe('without specification', function () {

            it('returns the first element on array', function () {
                expect(children.first().name).toBe('ana');
            });

        });

        describe('with specificiation', function () {
            it('returns the first element on array that satisfy the condition', function () {
                expect(children.first(function (x) { return x.sex === 'm'; }).name).toBe('fosto');
            });

        });

    });

    describe('#last', function () {

        describe('without specification', function () {

            it('returns the last element on array', function () {
                expect(children.last().name).toBe('martin');
            });

        });

        describe('with specifications', function () {
            it('returns the last element on array that satisfy the condition', function () {
                expect(children.last(function (x) { return x.sex === 'f'; }).name).toBe('auro');
            });

        });

    });

    describe('#count', function () {

        describe('without specification', function () {

            it('returns the last element on array', function () {
                expect(children.count()).toBe(9);
            });

        });

        describe('with specificiation', function () {
            it('returns the last element on array that satisfy the condition', function () {
                expect(children.count(function (x) { return x.sex === 'f'; })).toBe(5);
            });

        });

    });

    describe('#index', function () {

        describe('wit a function passed', function () {

            it('returns the index of element that satisfy the condition', function () {
                expect(children.index(function (x) { return x.name === 'bany'; })).toBe(5);
            });

        });

        describe('with a value passed', function () {

            it('returns the index of element that satisfy the condition', function () {
                expect([1, 3, 5, 7, 9, 11].index(7)).toBe(3);
            });

        });
    });

    describe('#pluck', function () {

        it('retrieves an element', function () {
            expect(children.pluck('name').length - 1).toBe(8);
        });

    });

    describe('#sum', function () {

        describe('given an array of numbers', function () {

            describe('without a specification', function () {

                it('returns summatory of the array elements', function () {
                    expect([1, 3, 5, 7, 9, 11].sum()).toBe(36);
                });

            });

            describe('with a specification', function () {

                it('returns summatory of the array elements', function () {
                    expect([1, 3, 5, 7, 9, 11].sum(function (x) { return x * 2; })).toBe(72);
                });

            });

        });

    });

    describe('#max', function () {

        it('returns null for an empty array', function () {
            expect([].max()).toBeNull();
        });

        describe('without comparer', function () {

            it('returns the max value of collection', function () {
                expect([1, 3, 5, 7, 9, 11, 2, 4, 6].max()).toBe(11);
            });

        });

        describe('with compare', function () {

            it('returns the max value ', function () {
                var compare = function (a, b) { return a.name.length - b.name.length; };
                expect(children.max(compare).name).toBe('martin');
            });

        });
    });

    describe('#min', function () {

        it('returns null for empty array', function () {
            expect([].min()).toBeNull();
        });

    });

    describe('#flatten', function () {

        it('returns a new flat array', function () {
            var complete, flattenArray;

            complete = [1, 2, 3, [4, 5, [6, 7, 8], 9, 10, 11, 12, 13, 14], 15, 16];
            flattenArray = complete.flatten();

            expect(flattenArray.length).toBe(16);
        });

    });/**/

});
